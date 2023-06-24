import { CRichText, CRuntime, CValueList, CValueMap } from "@collabs/collabs";
import { AbstractCrdt, CrdtFactory } from "../../js-lib/index.js"; // eslint-disable-line

export const name = "collabs";

/**
 * @implements {CrdtFactory}
 */
export class CollabsFactory {
  /**
   * @param {function(Uint8Array):void} [updateHandler]
   */
  create(updateHandler) {
    return new CollabsCRDT(updateHandler);
  }

  getName() {
    return name;
  }
}

/**
 * @implements {AbstractCrdt}
 */
export class CollabsCRDT {
  /**
   * @param {function(Uint8Array):void} [updateHandler]
   */
  constructor(updateHandler) {
    this.runtime = new CRuntime();
    if (updateHandler) {
      this.runtime.on("Send", (e) => {
        updateHandler(this._encodeUpdate(e.message, false));
      });
    }
    this.array = this.runtime.registerCollab(
      "array",
      (init) => new CValueList(init)
    );
    this.map = this.runtime.registerCollab(
      "map",
      (init) => new CValueMap(init)
    );
    // Y.Text is really a rich-text CRDT. For fairness, use our CRichText,
    // even though CText can support all of the ops here.
    this.text = this.runtime.registerCollab(
      "text",
      (init) => new CRichText(init)
    );
  }

  /**
   * Collabs distinguishes between "messages" (receive) vs "saves" (load),
   * but these benchmarks do not - they are both "updates".
   * So, we add a byte at the end saying which it is.
   *
   * @param {Uint8Array} messageOrSave
   * @param {boolean} isSave
   * @return {Uint8Array} encoded update
   */
  _encodeUpdate(messageOrSave, isSave) {
    const update = new Uint8Array(messageOrSave.length + 1);
    update.set(messageOrSave);
    update[messageOrSave.length] = isSave ? 1 : 0;
    return update;
  }

  /**
   * Inverse of _encodeUpdate.
   *
   * @param {Uint8Array} update
   * @return {[messageOrSave: Uint8Array, isSave: boolean]}
   */
  _decodeUpdate(update) {
    const messageOrSave = update.subarray(0, update.length - 1);
    const isSave = update[update.length - 1] == 1;
    return [messageOrSave, isSave];
  }

  /**
   * @return {Uint8Array|string}
   */
  getEncodedState() {
    return this._encodeUpdate(this.runtime.save(), true);
  }

  /**
   * @param {Uint8Array} update
   */
  applyUpdate(update) {
    const [messageOrSave, isSave] = this._decodeUpdate(update);
    if (isSave) this.runtime.load(messageOrSave);
    else this.runtime.receive(messageOrSave);
  }

  /**
   * Insert several items into the internal shared array implementation.
   *
   * @param {number} index
   * @param {Array<any>} elems
   */
  insertArray(index, elems) {
    // We wrap each op in a transaction so it sends its
    // message synchronously (skips default batching).
    this.runtime.transact(() => this.array.insert(index, ...elems));
  }

  /**
   * Delete several items into the internal shared array implementation.
   *
   * @param {number} index
   * @param {number} len
   */
  deleteArray(index, len) {
    this.runtime.transact(() => this.array.delete(index, len));
  }

  /**
   * @return {Array<any>}
   */
  getArray() {
    return [...this.array];
  }

  /**
   * Insert text into the internal shared text implementation.
   *
   * @param {number} index
   * @param {string} text
   */
  insertText(index, text) {
    this.runtime.transact(() => this.text.insert(index, text, {}));
  }

  /**
   * Delete text from the internal shared text implementation.
   *
   * @param {number} index
   * @param {number} len
   */
  deleteText(index, len) {
    this.runtime.transact(() => this.text.delete(index, len));
  }

  /**
   * @return {string}
   */
  getText() {
    return this.text.toString();
  }

  /**
   * @param {function (AbstractCrdt): void} f
   */
  transact(f) {
    // B3 benchmarks wrap applyUpdate in a transact call, which Collabs
    // doesn't expect ("Cannot call receive() during a transaction").
    // So ignore the benchmarks' transact calls.
    f(this);
  }

  /**
   * @param {string} key
   * @param {any} val
   */
  setMap(key, val) {
    this.runtime.transact(() => this.map.set(key, val));
  }

  /**
   * @return {Map<string,any> | Object<string, any>}
   */
  getMap() {
    return Object.fromEntries(this.map.entries());
  }
}
