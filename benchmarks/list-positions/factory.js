
import { AbstractCrdt, CrdtFactory } from '../../js-lib/index.js'; // eslint-disable-line
import * as error from 'lib0/error';
import { ListCRDT, TextCRDT } from './bundle.js';
import pako from "pako";

export const name = 'list-positions'

/**
 * @implements {CrdtFactory}
 */
export class ListPositionsFactory {
  /**
   * @param {function(Uint8Array|string):void} updateHandler
   */
  create (updateHandler) {
    return new ListPositionsCRDT(updateHandler)
  }

  /**
   * @param {function(Uint8Array):void} updateHandler
   * @param {Uint8Array} bin
   * @return {AbstractCrdt}
   */
  load (updateHandler, bin) {
    // @ts-ignore I believe string messages will work fine.
    const crdt = new ListPositionsCRDT(updateHandler)
    crdt.load(bin)
    return crdt
  }

  getName () {
    return name
  }
}

/**
 * @implements {AbstractCrdt}
 */
export class ListPositionsCRDT {
  /**
   * @param {function(Uint8Array|string):void} updateHandler
   */
  constructor (updateHandler) {
    /** @type {TextCRDT} */
    this.textCrdt = new TextCRDT(msg => {
      // @ts-ignore Modify message object.
      msg.path = "text";
      // Use simple JSON encoding.
      updateHandler(JSON.stringify(msg))
    })
    /** @type {ListCRDT<unknown>} */
    this.arrayCrdt = new ListCRDT(msg => {
      // @ts-ignore Modify message object.
      msg.path = "array";
      // Use simple JSON encoding.
      updateHandler(JSON.stringify(msg))
    })
  }

  /**
   * @return {Uint8Array|string}
   */
  getEncodedState () {
    const savedState = {
      text: this.textCrdt.save(),
      array: this.arrayCrdt.save()
    }
    // Use gzip'd JSON encoding. This trades off load/save time for size.
    // A custom binary encoding would probably give a better tradeoff.
    return pako.gzip(JSON.stringify(savedState));
  }

  /**
   * @param {Uint8Array} savedState
   */
  load(savedState) {
    const savedStateObj = JSON.parse(pako.ungzip(savedState, { to: "string" }));
    this.textCrdt.load(savedStateObj.text);
    this.arrayCrdt.load(savedStateObj.array);
  }

  /**
   * @param {string} update
   */
  applyUpdate (update) {
    const message = JSON.parse(update);
    switch (message.path) {
      case "text":
        this.textCrdt.receive(message);
        break;
      case "array":
        this.arrayCrdt.receive(message);
        break;
    }
  }

  /**
   * Insert several items into the internal shared array implementation.
   *
   * @param {number} index
   * @param {Array<any>} elems
   */
  insertArray (index, elems) {
    // list-positions supports bulk updates, they just aren't on the CRDTs.
    for (let i = 0; i < elems.length; i++) {
      this.arrayCrdt.insertAt(index + i, elems[i])
    }
  }

  /**
   * Delete several items into the internal shared array implementation.
   *
   * @param {number} index
   * @param {number} len
   */
  deleteArray (index, len) {
    // list-positions supports bulk updates, they just aren't on the CRDTs.
    for (let i = len - 1; i >= 0; i--) {
      this.arrayCrdt.deleteAt(index + i)
    }
  }

  /**
   * @return {Array<any>}
   */
  getArray () {
    return this.arrayCrdt.list.slice();
  }

  /**
   * Insert text into the internal shared text implementation.
   *
   * @param {number} index
   * @param {string} text
   */
  insertText (index, text) {
    // list-positions supports bulk updates, they just aren't on the CRDTs.
    for (let i = 0; i < text.length; i++) {
      this.textCrdt.insertAt(index + i, text[i])
    }
  }

  /**
   * Delete text from the internal shared text implementation.
   *
   * @param {number} index
   * @param {number} len
   */
  deleteText (index, len) {
    // list-positions supports bulk updates, they just aren't on the CRDTs.
    for (let i = len - 1; i >= 0; i--) {
      this.textCrdt.deleteAt(index + i)
    }
  }

  /**
   * @return {string}
   */
  getText () {
    return this.textCrdt.text.toString()
  }

  /**
   * @param {function (AbstractCrdt): void} f
   */
  transact (f) {
    f(this);
  }

  /**
   * @param {string} key
   * @param {any} val
   */
  setMap (key, val) {
    error.methodUnimplemented()
  }

  /**
   * @return {Map<string,any> | Object<string, any>}
   */
  getMap () {
    error.methodUnimplemented()
  }
}
