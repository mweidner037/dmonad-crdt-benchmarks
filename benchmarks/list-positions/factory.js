
import { AbstractCrdt, CrdtFactory } from '../../js-lib/index.js'; // eslint-disable-line
import * as error from 'lib0/error';
import { ListCRDT, TextCRDT } from './bundle.js';

export const name = 'list-positions'

/**
 * @implements {CrdtFactory}
 */
export class ListPositionsFactory {
  /**
   * @param {function(Uint8Array):void} updateHandler
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
   * @param {function(Uint8Array):void} updateHandler
   */
  constructor (updateHandler) {
    this.textCrdt = new TextCRDT(msg => {
      // Prepend with path to the CRDT.
      msg = "text " + msg;
      updateHandler(Buffer.from(msg))
    })
    this.arrayCrdt = new ListCRDT(msg => {
      // Prepend with path to the CRDT.
      msg = "array " + msg;
      updateHandler(Buffer.from(msg))
    })
  }

  /**
   * @return {Uint8Array|string}
   */
  getEncodedState () {
    return Y.encodeStateAsUpdateV2(this.ydoc)
  }

  /**
   * @param {Uint8Array} update
   */
  applyUpdate (update) {
    Y.applyUpdateV2(this.ydoc, update)
  }

  /**
   * @param {Uint8Array} savedState
   */
  load(savedState) {
    // TODO
  }

  /**
   * Insert several items into the internal shared array implementation.
   *
   * @param {number} index
   * @param {Array<any>} elems
   */
  insertArray (index, elems) {
    this.yarray.insert(index, elems)
  }

  /**
   * Delete several items into the internal shared array implementation.
   *
   * @param {number} index
   * @param {number} len
   */
  deleteArray (index, len) {
    this.yarray.delete(index, len)
  }

  /**
   * @return {Array<any>}
   */
  getArray () {
    return this.yarray.toArray()
  }

  /**
   * Insert text into the internal shared text implementation.
   *
   * @param {number} index
   * @param {string} text
   */
  insertText (index, text) {
    this.ytext.insert(index, text)
  }

  /**
   * Delete text from the internal shared text implementation.
   *
   * @param {number} index
   * @param {number} len
   */
  deleteText (index, len) {
    this.ytext.delete(index, len)
  }

  /**
   * @return {string}
   */
  getText () {
    return this.ytext.toString()
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
