import { Outline, PositionSet, Text, } from "list-positions";
/**
 * A traditional op-based/state-based text CRDT implemented on top of list-positions.
 *
 * send/receive work on general networks (they build in exactly-once partial-order delivery),
 * and save/load work as state-based merging.
 *
 * Internally, its state is a Text (for values) and a PositionSet (for tracking
 * which Positions have been "seen"). This implementation uses Positions in messages
 * and manually manages metadata; in particular, it must buffer certain out-of-order
 * messages.
 */
export class TextCRDT {
    send;
    /** When accessing externally, only query. */
    text;
    /**
     * A set of all Positions we've ever seen, whether currently present or deleted.
     * Used for state-based merging and handling reordered messages.
     *
     * We use PositionSet here because we don't care about the list order. If you did,
     * you could use Outline instead, with the same Order as this.list
     * (`this.seen = new Outline(this.order);`).
     */
    seen;
    /**
     * Maps from bunchID to a Set of messages that are waiting on that
     * bunch's BunchMeta before they can be processed.
     */
    pending;
    constructor(send) {
        this.send = send;
        this.text = new Text();
        this.seen = new PositionSet();
        this.pending = new Map();
    }
    insertAt(index, char) {
        const [pos, newMeta] = this.text.insertAt(index, char);
        const messageObj = { type: "set", pos, char };
        if (newMeta !== null)
            messageObj.meta = newMeta;
        this.send(JSON.stringify(messageObj));
    }
    deleteAt(index) {
        const pos = this.text.positionAt(index);
        this.text.delete(pos);
        const messageObj = { type: "delete", pos };
        this.send(JSON.stringify(messageObj));
    }
    receive(msg) {
        // TODO: test dedupe & partial ordering.
        const decoded = JSON.parse(msg);
        const bunchID = decoded.pos.bunchID;
        switch (decoded.type) {
            case "delete":
                // Mark the position as seen immediately, even if we don't have metadata
                // for its bunch yet. Okay because this.seen is a PositionSet instead of an Outline.
                this.seen.add(decoded.pos);
                // Delete the position if present.
                // If the bunch is unknown, it's definitely not present, and we
                // should skip calling list.has to avoid a "Missing metadata" error.
                if (this.text.order.getNode(bunchID) !== undefined &&
                    this.text.has(decoded.pos)) {
                    // For a hypothetical event, compute the index.
                    void this.text.indexOfPosition(decoded.pos);
                    this.text.delete(decoded.pos);
                }
                break;
            case "set":
                // This check is okay even if we don't have metadata for pos's bunch yet,
                // because this.seen is a PositionSet instead of an Outline.
                if (this.seen.has(decoded.pos)) {
                    // The position has already been seen (inserted, inserted & deleted, or
                    // deleted by an out-of-order message). So don't need to insert it again.
                    return;
                }
                if (decoded.meta) {
                    const parentID = decoded.meta.parentID;
                    if (this.text.order.getNode(parentID) === undefined) {
                        // The meta can't be processed yet because its parent bunch is unknown.
                        // Add it to pending.
                        this.addToPending(parentID, msg);
                        return;
                    }
                    else
                        this.text.order.addMetas([decoded.meta]);
                    if (this.text.order.getNode(bunchID) === undefined) {
                        // The message can't be processed yet because its bunch is unknown.
                        // Add it to pending.
                        this.addToPending(bunchID, msg);
                        return;
                    }
                }
                // At this point, BunchMeta dependencies are satisfied. Process the message.
                this.text.set(decoded.pos, decoded.char);
                // Add to seen even before it's deleted, to reduce sparse-array fragmentation.
                this.seen.add(decoded.pos);
                // For a hypothetical event, compute the index.
                void this.text.indexOfPosition(decoded.pos);
                if (decoded.meta) {
                    // The meta may have unblocked pending messages.
                    const unblocked = this.pending.get(decoded.meta.parentID);
                    if (unblocked !== undefined) {
                        // TODO: if you unblock a long dependency chain (unlikely),
                        // this recursion could overflow the stack.
                        for (const msg2 of unblocked)
                            this.receive(msg2);
                    }
                }
                break;
        }
    }
    addToPending(bunchID, msg) {
        let bunchPending = this.pending.get(bunchID);
        if (bunchPending === undefined) {
            bunchPending = new Set();
            this.pending.set(bunchID, bunchPending);
        }
        bunchPending.add(msg);
    }
    save() {
        const savedStateObj = {
            order: this.text.order.save(),
            text: this.text.save(),
            seen: this.seen.save(),
        };
        return JSON.stringify(savedStateObj);
    }
    load(savedState) {
        const savedStateObj = JSON.parse(savedState);
        if (this.seen.state.size === 0) {
            // Never been used, so okay to load directly instead of doing a state-based
            // merge.
            this.text.order.load(savedStateObj.order);
            this.text.load(savedStateObj.text);
            this.seen.load(savedStateObj.seen);
        }
        else {
            // TODO: benchmark merging.
            // TODO: events.
            const otherText = new Text();
            const otherSeen = new Outline(otherText.order);
            otherText.order.load(savedStateObj.order);
            otherText.load(savedStateObj.text);
            otherSeen.load(savedStateObj.seen);
            // Loop over all positions that had been inserted or deleted into
            // the other list.
            // We don't have to manage metadata because a saved state always includes
            // all of its dependent metadata.
            for (const pos of otherSeen) {
                if (!this.seen.has(pos)) {
                    // pos is new to us. Copy its state from the other list.
                    if (otherText.has(pos))
                        this.text.set(pos, otherText.get(pos));
                    this.seen.add(pos);
                }
                else {
                    // We already know of pos. If it's deleted in the other list,
                    // ensure it's deleted here too.
                    if (!otherText.has(pos))
                        this.text.delete(pos);
                }
            }
        }
    }
}
