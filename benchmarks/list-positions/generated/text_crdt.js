import { Outline, PositionSet, Text, } from "list-positions";
/**
 * A traditional op-based/state-based text CRDT implemented on top of list-positions.
 * Based on from https://github.com/mweidner037/list-positions/blob/master/benchmarks/internal/text_crdt.ts
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
        this.seen.add(pos);
        const message = { type: "set", pos, char };
        if (newMeta !== null)
            message.meta = newMeta;
        this.send(message);
    }
    deleteAt(index) {
        const pos = this.text.positionAt(index);
        this.text.delete(pos);
        const message = { type: "delete", pos };
        this.send(message);
    }
    receive(message) {
        // TODO: test dedupe & partial ordering.
        const bunchID = message.pos.bunchID;
        switch (message.type) {
            case "delete":
                // Mark the position as seen immediately, even if we don't have metadata
                // for its bunch yet. Okay because this.seen is a PositionSet instead of an Outline.
                this.seen.add(message.pos);
                // Delete the position if present.
                // If the bunch is unknown, it's definitely not present, and we
                // should skip calling list.has to avoid a "Missing metadata" error.
                if (this.text.order.getNode(bunchID) !== undefined &&
                    this.text.has(message.pos)) {
                    // For a hypothetical event, compute the index.
                    void this.text.indexOfPosition(message.pos);
                    this.text.delete(message.pos);
                }
                break;
            case "set":
                // This check is okay even if we don't have metadata for pos's bunch yet,
                // because this.seen is a PositionSet instead of an Outline.
                if (this.seen.has(message.pos)) {
                    // The position has already been seen (inserted, inserted & deleted, or
                    // deleted by an out-of-order message). So don't need to insert it again.
                    return;
                }
                if (message.meta) {
                    const parentID = message.meta.parentID;
                    if (this.text.order.getNode(parentID) === undefined) {
                        // The meta can't be processed yet because its parent bunch is unknown.
                        // Add it to pending.
                        this.addToPending(parentID, message);
                        return;
                    }
                    else
                        this.text.order.addMetas([message.meta]);
                    if (this.text.order.getNode(bunchID) === undefined) {
                        // The message can't be processed yet because its bunch is unknown.
                        // Add it to pending.
                        this.addToPending(bunchID, message);
                        return;
                    }
                }
                // At this point, BunchMeta dependencies are satisfied. Process the message.
                this.text.set(message.pos, message.char);
                // Add to seen even before it's deleted, to reduce sparse-array fragmentation.
                this.seen.add(message.pos);
                // For a hypothetical event, compute the index.
                void this.text.indexOfPosition(message.pos);
                if (message.meta) {
                    // The meta may have unblocked pending messages.
                    const unblocked = this.pending.get(message.meta.bunchID);
                    if (unblocked !== undefined) {
                        this.pending.delete(message.meta.bunchID);
                        // TODO: if you unblock a long dependency chain (unlikely),
                        // this recursion could overflow the stack.
                        for (const msg2 of unblocked)
                            this.receive(msg2);
                    }
                }
                break;
        }
    }
    addToPending(bunchID, message) {
        let bunchPending = this.pending.get(bunchID);
        if (bunchPending === undefined) {
            bunchPending = new Set();
            this.pending.set(bunchID, bunchPending);
        }
        bunchPending.add(message);
    }
    save() {
        return {
            order: this.text.order.save(),
            text: this.text.save(),
            seen: this.seen.save(),
        };
    }
    load(savedState) {
        if (this.seen.state.size === 0) {
            // Never been used, so okay to load directly instead of doing a state-based
            // merge.
            this.text.order.load(savedState.order);
            this.text.load(savedState.text);
            this.seen.load(savedState.seen);
        }
        else {
            // TODO: benchmark merging.
            // TODO: events.
            const otherText = new Text();
            const otherSeen = new Outline(otherText.order);
            otherText.order.load(savedState.order);
            otherText.load(savedState.text);
            otherSeen.load(savedState.seen);
            // Loop over all positions that had been inserted or deleted into
            // the other list.
            this.text.order.load(savedState.order);
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
