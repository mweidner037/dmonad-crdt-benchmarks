import { BunchMeta, List, ListSavedState, OrderSavedState, OutlineSavedState, Position } from "list-positions";
export type ListCrdtMessage<T> = {
    type: "set";
    pos: Position;
    value: T;
    meta?: BunchMeta;
} | {
    type: "delete";
    pos: Position;
};
export type ListCrdtSavedState<T> = {
    order: OrderSavedState;
    list: ListSavedState<T>;
    seen: OutlineSavedState;
};
/**
 * A traditional op-based/state-based list CRDT implemented on top of list-positions.
 * Based on https://github.com/mweidner037/list-positions/blob/master/benchmarks/internal/list_crdt.ts
 *
 * send/receive work on general networks (they build in exactly-once partial-order delivery),
 * and save/load work as state-based merging.
 *
 * Internally, its state is a `List<T>` (for values) and a PositionSet (for tracking
 * which Positions have been "seen"). This implementation uses Positions in messages
 * and manually manages metadata; in particular, it must buffer certain out-of-order
 * messages.
 */
export declare class ListCRDT<T> {
    private readonly send;
    /** When accessing externally, only query. */
    readonly list: List<T>;
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
    constructor(send: (message: ListCrdtMessage<T>) => void);
    insertAt(index: number, value: T): void;
    deleteAt(index: number): void;
    receive(message: ListCrdtMessage<T>): void;
    private addToPending;
    save(): ListCrdtSavedState<T>;
    load(savedState: ListCrdtSavedState<T>): void;
}
