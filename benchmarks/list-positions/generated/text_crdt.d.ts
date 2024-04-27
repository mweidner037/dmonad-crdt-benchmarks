import { BunchMeta, OrderSavedState, OutlineSavedState, Position, Text, TextSavedState } from "list-positions";
export type TextCrdtMessage = {
    type: "set";
    pos: Position;
    char: string;
    meta?: BunchMeta;
} | {
    type: "delete";
    pos: Position;
};
export type TextCrdtSavedState = {
    order: OrderSavedState;
    text: TextSavedState;
    seen: OutlineSavedState;
};
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
export declare class TextCRDT {
    private readonly send;
    /** When accessing externally, only query. */
    readonly text: Text;
    /**
     * A set of all Positions we've ever seen, whether currently present or deleted.
     * Used for state-based merging and handling reordered messages.
     *
     * We use PositionSet here because we don't care about the list order. If you did,
     * you could use Outline instead, with the same Order as this.list
     * (`this.seen = new Outline(this.order);`).
     */
    private readonly seen;
    /**
     * Maps from bunchID to a Set of messages that are waiting on that
     * bunch's BunchMeta before they can be processed.
     */
    private readonly pending;
    constructor(send: (message: TextCrdtMessage) => void);
    insertAt(index: number, char: string): void;
    deleteAt(index: number): void;
    receive(message: TextCrdtMessage): void;
    private addToPending;
    save(): TextCrdtSavedState;
    load(savedState: TextCrdtSavedState): void;
}
