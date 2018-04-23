(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('Invalid typed array length')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (value instanceof ArrayBuffer) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  return fromObject(value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj) {
    if (isArrayBufferView(obj) || 'length' in obj) {
      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
        return createBuffer(0)
      }
      return fromArrayLike(obj)
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (isArrayBufferView(string) || string instanceof ArrayBuffer) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : new Buffer(val, encoding)
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// Node 0.10 supports `ArrayBuffer` but lacks `ArrayBuffer.isView`
function isArrayBufferView (obj) {
  return (typeof ArrayBuffer.isView === 'function') && ArrayBuffer.isView(obj)
}

function numberIsNaN (obj) {
  return obj !== obj // eslint-disable-line no-self-compare
}

},{"base64-js":1,"ieee754":5}],4:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],5:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],6:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],7:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],8:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":6,"./encode":7}],9:[function(require,module,exports){
/**
 * Root reference for iframes.
 */

var root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  console.warn("Using browser-only version of superagent in non-browser environment");
  root = this;
}

var Emitter = require('component-emitter');
var RequestBase = require('./request-base');
var isObject = require('./is-object');
var isFunction = require('./is-function');
var ResponseBase = require('./response-base');
var shouldRetry = require('./should-retry');

/**
 * Noop.
 */

function noop(){};

/**
 * Expose `request`.
 */

var request = exports = module.exports = function(method, url) {
  // callback
  if ('function' == typeof url) {
    return new exports.Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
}

exports.Request = Request;

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  throw Error("Browser-only verison of superagent could not find XHR");
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    pushEncodedKeyValuePair(pairs, key, obj[key]);
  }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (val != null) {
    if (Array.isArray(val)) {
      val.forEach(function(v) {
        pushEncodedKeyValuePair(pairs, key, v);
      });
    } else if (isObject(val)) {
      for(var subkey in val) {
        pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
      }
    } else {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(val));
    }
  } else if (val === null) {
    pairs.push(encodeURIComponent(key));
  }
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var pair;
  var pos;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');
    if (pos == -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] =
        decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  var status = this.xhr.status;
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
      status = 204;
  }
  this._setStatusProperties(status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this._setHeaderProperties(this.header);

  if (null === this.text && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method != 'HEAD'
      ? this._parseBody(this.text ? this.text : this.xhr.response)
      : null;
  }
}

ResponseBase(Response.prototype);

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function(str){
  var parse = request.parse[this.type];
  if(this.req._parser) {
    return this.req._parser(this, str);
  }
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      if (self.xhr) {
        // ie9 doesn't have 'response' property
        err.rawResponse = typeof self.xhr.responseType == 'undefined' ? self.xhr.responseText : self.xhr.response;
        // issue #876: return the http status code if the response parsing fails
        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; // backwards-compat only
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);

    var new_err;
    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
        new_err.original = err;
        new_err.response = res;
        new_err.status = res.status;
      }
    } catch(e) {
      new_err = e; // #985 touching res may cause INVALID_STATE_ERR on old Android
    }

    // #1000 don't catch errors from the callback to avoid double calling it
    if (new_err) {
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}

/**
 * Mixin `Emitter` and `RequestBase`.
 */

Emitter(Request.prototype);
RequestBase(Request.prototype);

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (typeof pass === 'object' && pass !== null) { // pass is optional and can substitute for options
    options = pass;
  }
  if (!options) {
    options = {
      type: 'function' === typeof btoa ? 'basic' : 'auto',
    }
  }

  switch (options.type) {
    case 'basic':
      this.set('Authorization', 'Basic ' + btoa(user + ':' + pass));
    break;

    case 'auto':
      this.username = user;
      this.password = pass;
    break;
      
    case 'bearer': // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', 'Bearer ' + user);
    break;  
  }
  return this;
};

/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, options){
  if (file) {
    if (this._data) {
      throw Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  // console.log(this._retries, this._maxRetries)
  if (this._maxRetries && this._retries++ < this._maxRetries && shouldRetry(err, res)) {
    return this._retry();
  }

  var fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

// This only warns, because the request is still likely to work
Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function(){
  console.warn("This is not supported in browser version of superagent");
  return this;
};

// This throws, because it can't send/receive data as expected
Request.prototype.pipe = Request.prototype.write = function(){
  throw Error("Streaming is not supported in browser version of superagent");
};

/**
 * Compose querystring to append to req.url
 *
 * @api private
 */

Request.prototype._appendQueryString = function(){
  var query = this._query.join('&');
  if (query) {
    this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
  }

  if (this._sort) {
    var index = this.url.indexOf('?');
    if (index >= 0) {
      var queryArr = this.url.substring(index + 1).split('&');
      if (isFunction(this._sort)) {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }
      this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
    }
  }
};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
Request.prototype._isHost = function _isHost(obj) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return obj && 'object' === typeof obj && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
}

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  if (this._endCalled) {
    console.warn("Warning: .end() was called twice. This is not supported in superagent");
  }
  this._endCalled = true;

  // store callback
  this._callback = fn || noop;

  // querystring
  this._appendQueryString();

  return this._end();
};

Request.prototype._end = function() {
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var data = this._formData || this._data;

  this._setTimeouts();

  // state change
  xhr.onreadystatechange = function(){
    var readyState = xhr.readyState;
    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }
    if (4 != readyState) {
      return;
    }

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(direction, e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = direction;
    self.emit('progress', e);
  }
  if (this.hasListeners('progress')) {
    try {
      xhr.onprogress = handleProgress.bind(null, 'download');
      if (xhr.upload) {
        xhr.upload.onprogress = handleProgress.bind(null, 'upload');
      }
    } catch(e) {
      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  // initiate request
  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if (!this._formData && 'GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];
    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) {
      serialize = request.serialize['application/json'];
    }
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;

    if (this.header.hasOwnProperty(field))
      xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.options = function(url, data, fn){
  var req = request('OPTIONS', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

function del(url, data, fn){
  var req = request('DELETE', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

},{"./is-function":10,"./is-object":11,"./request-base":12,"./response-base":13,"./should-retry":14,"component-emitter":4}],10:[function(require,module,exports){
/**
 * Check if `fn` is a function.
 *
 * @param {Function} fn
 * @return {Boolean}
 * @api private
 */
var isObject = require('./is-object');

function isFunction(fn) {
  var tag = isObject(fn) ? Object.prototype.toString.call(fn) : '';
  return tag === '[object Function]';
}

module.exports = isFunction;

},{"./is-object":11}],11:[function(require,module,exports){
/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null !== obj && 'object' === typeof obj;
}

module.exports = isObject;

},{}],12:[function(require,module,exports){
/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = require('./is-object');

/**
 * Expose `RequestBase`.
 */

module.exports = RequestBase;

/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in RequestBase.prototype) {
    obj[key] = RequestBase.prototype[key];
  }
  return obj;
}

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.clearTimeout = function _clearTimeout(){
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  return this;
};

/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.serialize = function serialize(fn){
  this._serializer = fn;
  return this;
};

/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, read, deadline}
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.timeout = function timeout(options){
  if (!options || 'object' !== typeof options) {
    this._timeout = options;
    this._responseTimeout = 0;
    return this;
  }

  for(var option in options) {
    switch(option) {
      case 'deadline':
        this._timeout = options.deadline;
        break;
      case 'response':
        this._responseTimeout = options.response;
        break;
      default:
        console.warn("Unknown timeout option", option);
    }
  }
  return this;
};

/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.retry = function retry(count){
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  return this;
};

/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */

RequestBase.prototype._retry = function() {
  this.clearTimeout();

  // node
  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;

  return this._end();
};

/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */

RequestBase.prototype.then = function then(resolve, reject) {
  if (!this._fullfilledPromise) {
    var self = this;
    if (this._endCalled) {
      console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
    }
    this._fullfilledPromise = new Promise(function(innerResolve, innerReject){
      self.end(function(err, res){
        if (err) innerReject(err); else innerResolve(res);
      });
    });
  }
  return this._fullfilledPromise.then(resolve, reject);
}

RequestBase.prototype.catch = function(cb) {
  return this.then(undefined, cb);
};

/**
 * Allow for extension
 */

RequestBase.prototype.use = function use(fn) {
  fn(this);
  return this;
}

RequestBase.prototype.ok = function(cb) {
  if ('function' !== typeof cb) throw Error("Callback required");
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function(res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};


/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

RequestBase.prototype.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

RequestBase.prototype.getHeader = RequestBase.prototype.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
RequestBase.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
RequestBase.prototype.field = function(name, val) {

  // name should be either a string or an object.
  if (null === name ||  undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      this.field(key, name[key]);
    }
    return this;
  }

  if (Array.isArray(val)) {
    for (var i in val) {
      this.field(name, val[i]);
    }
    return this;
  }

  // val should be defined now
  if (null === val || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }
  if ('boolean' === typeof val) {
    val = '' + val;
  }
  this._getFormData().append(name, val);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */
RequestBase.prototype.abort = function(){
  if (this._aborted) {
    return this;
  }
  this._aborted = true;
  this.xhr && this.xhr.abort(); // browser
  this.req && this.req.abort(); // node
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

RequestBase.prototype.withCredentials = function(on){
  // This is browser-only functionality. Node side is no-op.
  if(on==undefined) on = true;
  this._withCredentials = on;
  return this;
};

/**
 * Set the max redirects to `n`. Does noting in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.redirects = function(n){
  this._maxRedirects = n;
  return this;
};

/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */

RequestBase.prototype.toJSON = function(){
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};


/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.send = function(data){
  var isObj = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw Error("Can't merge these send calls");
  }

  // merge
  if (isObj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  }

  // default to json
  if (!type) this.type('json');
  return this;
};


/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.sortQuery = function(sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

RequestBase.prototype._timeoutError = function(reason, timeout, errno){
  if (this._aborted) {
    return;
  }
  var err = new Error(reason + timeout + 'ms exceeded');
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function() {
  var self = this;

  // deadline
  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  }
  // response timeout
  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function(){
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
}

},{"./is-object":11}],13:[function(require,module,exports){

/**
 * Module dependencies.
 */

var utils = require('./utils');

/**
 * Expose `ResponseBase`.
 */

module.exports = ResponseBase;

/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    obj[key] = ResponseBase.prototype[key];
  }
  return obj;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

ResponseBase.prototype.get = function(field){
    return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

ResponseBase.prototype._setHeaderProperties = function(header){
    // TODO: moar!
    // TODO: make this a util

    // content-type
    var ct = header['content-type'] || '';
    this.type = utils.type(ct);

    // params
    var params = utils.params(ct);
    for (var key in params) this[key] = params[key];

    this.links = {};

    // links
    try {
        if (header.link) {
            this.links = utils.parseLinks(header.link);
        }
    } catch (err) {
        // ignore
    }
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

ResponseBase.prototype._setStatusProperties = function(status){
    var type = status / 100 | 0;

    // status / class
    this.status = this.statusCode = status;
    this.statusType = type;

    // basics
    this.info = 1 == type;
    this.ok = 2 == type;
    this.redirect = 3 == type;
    this.clientError = 4 == type;
    this.serverError = 5 == type;
    this.error = (4 == type || 5 == type)
        ? this.toError()
        : false;

    // sugar
    this.accepted = 202 == status;
    this.noContent = 204 == status;
    this.badRequest = 400 == status;
    this.unauthorized = 401 == status;
    this.notAcceptable = 406 == status;
    this.forbidden = 403 == status;
    this.notFound = 404 == status;
};

},{"./utils":15}],14:[function(require,module,exports){
var ERROR_CODES = [
  'ECONNRESET',
  'ETIMEDOUT',
  'EADDRINFO',
  'ESOCKETTIMEDOUT'
];

/**
 * Determine if a request should be retried.
 * (Borrowed from segmentio/superagent-retry)
 *
 * @param {Error} err
 * @param {Response} [res]
 * @returns {Boolean}
 */
module.exports = function shouldRetry(err, res) {
  if (err && err.code && ~ERROR_CODES.indexOf(err.code)) return true;
  if (res && res.status && res.status >= 500) return true;
  // Superagent timeout
  if (err && 'timeout' in err && err.code == 'ECONNABORTED') return true;
  if (err && 'crossDomain' in err) return true;
  return false;
};

},{}],15:[function(require,module,exports){

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

exports.type = function(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.params = function(str){
  return str.split(/ *; */).reduce(function(obj, str){
    var parts = str.split(/ *= */);
    var key = parts.shift();
    var val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.parseLinks = function(str){
  return str.split(/ *, */).reduce(function(obj, str){
    var parts = str.split(/ *; */);
    var url = parts[0].slice(1, -1);
    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
    obj[rel] = url;
    return obj;
  }, {});
};

/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */

exports.cleanHeader = function(header, shouldStripCookie){
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header['host'];
  if (shouldStripCookie) {
    delete header['cookie'];
  }
  return header;
};
},{}],16:[function(require,module,exports){
(function (Buffer){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['superagent', 'querystring'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('superagent'), require('querystring'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ApiClient = factory(root.superagent, root.querystring);
  }
}(this, function(superagent, querystring) {
  'use strict';

  /**
   * @module ApiClient
   * @version 2.6.0
   */

  /**
   * Manages low level client-server communications, parameter marshalling, etc. There should not be any need for an
   * application to use this class directly - the *Api and model classes provide the public API for the service. The
   * contents of this file should be regarded as internal but are documented for completeness.
   * @alias module:ApiClient
   * @class
   */
  var exports = function() {
    /**
     * The base URL against which to resolve every API call's (relative) path.
     * @type {String}
     * @default https://api.flat.io/v2
     */
    this.basePath = 'https://api.flat.io/v2'.replace(/\/+$/, '');

    /**
     * The authentication methods to be included for all API calls.
     * @type {Array.<String>}
     */
    this.authentications = {
      'OAuth2': {type: 'oauth2'}
    };
    /**
     * The default HTTP headers to be included for all API calls.
     * @type {Array.<String>}
     * @default {}
     */
    this.defaultHeaders = {};

    /**
     * The default HTTP timeout for all API calls.
     * @type {Number}
     * @default 60000
     */
    this.timeout = 60000;

    /**
     * If set to false an additional timestamp parameter is added to all API GET calls to
     * prevent browser caching
     * @type {Boolean}
     * @default true
     */
    this.cache = true;

    /**
     * If set to true, the client will save the cookies from each server
     * response, and return them in the next request.
     * @default false
     */
    this.enableCookies = false;

    /*
     * Used to save and return cookies in a node.js (non-browser) setting,
     * if this.enableCookies is set to true.
     */
    if (typeof window === 'undefined') {
      this.agent = new superagent.agent();
    }

    /*
     * Allow user to override superagent agent
     */
    this.requestAgent = null;
  };

  /**
   * Returns a string representation for an actual parameter.
   * @param param The actual parameter.
   * @returns {String} The string representation of <code>param</code>.
   */
  exports.prototype.paramToString = function(param) {
    if (param == undefined || param == null) {
      return '';
    }
    if (param instanceof Date) {
      return param.toJSON();
    }
    return param.toString();
  };

  /**
   * Builds full URL by appending the given path to the base URL and replacing path parameter place-holders with parameter values.
   * NOTE: query parameters are not handled here.
   * @param {String} path The path to append to the base URL.
   * @param {Object} pathParams The parameter values to append.
   * @returns {String} The encoded path with parameter values substituted.
   */
  exports.prototype.buildUrl = function(path, pathParams) {
    if (!path.match(/^\//)) {
      path = '/' + path;
    }
    var url = this.basePath + path;
    var _this = this;
    url = url.replace(/\{([\w-]+)\}/g, function(fullMatch, key) {
      var value;
      if (pathParams.hasOwnProperty(key)) {
        value = _this.paramToString(pathParams[key]);
      } else {
        value = fullMatch;
      }
      return encodeURIComponent(value);
    });
    return url;
  };

  /**
   * Checks whether the given content type represents JSON.<br>
   * JSON content type examples:<br>
   * <ul>
   * <li>application/json</li>
   * <li>application/json; charset=UTF8</li>
   * <li>APPLICATION/JSON</li>
   * </ul>
   * @param {String} contentType The MIME content type to check.
   * @returns {Boolean} <code>true</code> if <code>contentType</code> represents JSON, otherwise <code>false</code>.
   */
  exports.prototype.isJsonMime = function(contentType) {
    return Boolean(contentType != null && contentType.match(/^application\/json(;.*)?$/i));
  };

  /**
   * Chooses a content type from the given array, with JSON preferred; i.e. return JSON if included, otherwise return the first.
   * @param {Array.<String>} contentTypes
   * @returns {String} The chosen content type, preferring JSON.
   */
  exports.prototype.jsonPreferredMime = function(contentTypes) {
    for (var i = 0; i < contentTypes.length; i++) {
      if (this.isJsonMime(contentTypes[i])) {
        return contentTypes[i];
      }
    }
    return contentTypes[0];
  };

  /**
   * Checks whether the given parameter value represents file-like content.
   * @param param The parameter to check.
   * @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
   */
  exports.prototype.isFileParam = function(param) {
    // fs.ReadStream in Node.js and Electron (but not in runtime like browserify)
    if (typeof require === 'function') {
      var fs;
      try {
        fs = require('fs');
      } catch (err) {}
      if (fs && fs.ReadStream && param instanceof fs.ReadStream) {
        return true;
      }
    }
    // Buffer in Node.js
    if (typeof Buffer === 'function' && param instanceof Buffer) {
      return true;
    }
    // Blob in browser
    if (typeof Blob === 'function' && param instanceof Blob) {
      return true;
    }
    // File in browser (it seems File object is also instance of Blob, but keep this for safe)
    if (typeof File === 'function' && param instanceof File) {
      return true;
    }
    return false;
  };

  /**
   * Normalizes parameter values:
   * <ul>
   * <li>remove nils</li>
   * <li>keep files and arrays</li>
   * <li>format to string with `paramToString` for other cases</li>
   * </ul>
   * @param {Object.<String, Object>} params The parameters as object properties.
   * @returns {Object.<String, Object>} normalized parameters.
   */
  exports.prototype.normalizeParams = function(params) {
    var newParams = {};
    for (var key in params) {
      if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
        var value = params[key];
        if (this.isFileParam(value) || Array.isArray(value)) {
          newParams[key] = value;
        } else {
          newParams[key] = this.paramToString(value);
        }
      }
    }
    return newParams;
  };

  /**
   * Enumeration of collection format separator strategies.
   * @enum {String}
   * @readonly
   */
  exports.CollectionFormatEnum = {
    /**
     * Comma-separated values. Value: <code>csv</code>
     * @const
     */
    CSV: ',',
    /**
     * Space-separated values. Value: <code>ssv</code>
     * @const
     */
    SSV: ' ',
    /**
     * Tab-separated values. Value: <code>tsv</code>
     * @const
     */
    TSV: '\t',
    /**
     * Pipe(|)-separated values. Value: <code>pipes</code>
     * @const
     */
    PIPES: '|',
    /**
     * Native array. Value: <code>multi</code>
     * @const
     */
    MULTI: 'multi'
  };

  /**
   * Builds a string representation of an array-type actual parameter, according to the given collection format.
   * @param {Array} param An array parameter.
   * @param {module:ApiClient.CollectionFormatEnum} collectionFormat The array element separator strategy.
   * @returns {String|Array} A string representation of the supplied collection, using the specified delimiter. Returns
   * <code>param</code> as is if <code>collectionFormat</code> is <code>multi</code>.
   */
  exports.prototype.buildCollectionParam = function buildCollectionParam(param, collectionFormat) {
    if (param == null) {
      return null;
    }
    switch (collectionFormat) {
      case 'csv':
        return param.map(this.paramToString).join(',');
      case 'ssv':
        return param.map(this.paramToString).join(' ');
      case 'tsv':
        return param.map(this.paramToString).join('\t');
      case 'pipes':
        return param.map(this.paramToString).join('|');
      case 'multi':
        // return the array directly as SuperAgent will handle it as expected
        return param.map(this.paramToString);
      default:
        throw new Error('Unknown collection format: ' + collectionFormat);
    }
  };

  /**
   * Applies authentication headers to the request.
   * @param {Object} request The request object created by a <code>superagent()</code> call.
   * @param {Array.<String>} authNames An array of authentication method names.
   */
  exports.prototype.applyAuthToRequest = function(request, authNames) {
    var _this = this;
    authNames.forEach(function(authName) {
      var auth = _this.authentications[authName];
      switch (auth.type) {
        case 'basic':
          if (auth.username || auth.password) {
            request.auth(auth.username || '', auth.password || '');
          }
          break;
        case 'apiKey':
          if (auth.apiKey) {
            var data = {};
            if (auth.apiKeyPrefix) {
              data[auth.name] = auth.apiKeyPrefix + ' ' + auth.apiKey;
            } else {
              data[auth.name] = auth.apiKey;
            }
            if (auth['in'] === 'header') {
              request.set(data);
            } else {
              request.query(data);
            }
          }
          break;
        case 'oauth2':
          if (auth.accessToken) {
            request.set({'Authorization': 'Bearer ' + auth.accessToken});
          }
          break;
        default:
          throw new Error('Unknown authentication type: ' + auth.type);
      }
    });
  };

  /**
   * Deserializes an HTTP response body into a value of the specified type.
   * @param {Object} response A SuperAgent response object.
   * @param {(String|Array.<String>|Object.<String, Object>|Function)} returnType The type to return. Pass a string for simple types
   * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
   * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
   * all properties on <code>data<code> will be converted to this type.
   * @returns A value of the specified type.
   */
  exports.prototype.deserialize = function deserialize(response, returnType) {
    if (response == null || returnType == null || response.status == 204) {
      return null;
    }
    // Rely on SuperAgent for parsing response body.
    // See http://visionmedia.github.io/superagent/#parsing-response-bodies
    var data = response.body;
    if (data == null || (typeof data === 'object' && typeof data.length === 'undefined' && !Object.keys(data).length)) {
      // SuperAgent does not always produce a body; use the unparsed response as a fallback
      data = response.text;
    }
    return exports.convertToType(data, returnType);
  };

  /**
   * Callback function to receive the result of the operation.
   * @callback module:ApiClient~callApiCallback
   * @param {String} error Error message, if any.
   * @param data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Invokes the REST service using the supplied settings and parameters.
   * @param {String} path The base URL to invoke.
   * @param {String} httpMethod The HTTP method to use.
   * @param {Object.<String, String>} pathParams A map of path parameters and their values.
   * @param {Object.<String, Object>} queryParams A map of query parameters and their values.
   * @param {Object.<String, Object>} collectionQueryParams A map of collection query parameters and their values.
   * @param {Object.<String, Object>} headerParams A map of header parameters and their values.
   * @param {Object.<String, Object>} formParams A map of form parameters and their values.
   * @param {Object} bodyParam The value to pass as the request body.
   * @param {Array.<String>} authNames An array of authentication type names.
   * @param {Array.<String>} contentTypes An array of request MIME types.
   * @param {Array.<String>} accepts An array of acceptable response MIME types.
   * @param {(String|Array|ObjectFunction)} returnType The required type to return; can be a string for simple types or the
   * constructor for a complex type.
   * @param {module:ApiClient~callApiCallback} callback The callback function.
   * @returns {Object} The SuperAgent request object.
   */
  exports.prototype.callApi = function callApi(path, httpMethod, pathParams,
      queryParams, collectionQueryParams, headerParams, formParams, bodyParam, authNames, contentTypes, accepts,
      returnType, callback) {

    var _this = this;
    var url = this.buildUrl(path, pathParams);
    var request = superagent(httpMethod, url);

    // apply authentications
    this.applyAuthToRequest(request, authNames);

    // set collection query parameters
    for (var key in collectionQueryParams) {
      if (collectionQueryParams.hasOwnProperty(key)) {
        var param = collectionQueryParams[key];
        if (param.collectionFormat === 'csv') {
          // SuperAgent normally percent-encodes all reserved characters in a query parameter. However,
          // commas are used as delimiters for the 'csv' collectionFormat so they must not be encoded. We
          // must therefore construct and encode 'csv' collection query parameters manually.
          if (param.value != null) {
            var value = param.value.map(this.paramToString).map(encodeURIComponent).join(',');
            request.query(encodeURIComponent(key) + "=" + value);
          }
        } else {
          // All other collection query parameters should be treated as ordinary query parameters.
          queryParams[key] = this.buildCollectionParam(param.value, param.collectionFormat);
        }
      }
    }

    // set query parameters
    if (httpMethod.toUpperCase() === 'GET' && this.cache === false) {
        queryParams['_'] = new Date().getTime();
    }
    request.query(this.normalizeParams(queryParams));

    // set header parameters
    request.set(this.defaultHeaders).set(this.normalizeParams(headerParams));


    // set requestAgent if it is set by user
    if (this.requestAgent) {
      request.agent(this.requestAgent);
    }

    // set request timeout
    request.timeout(this.timeout);

    var contentType = this.jsonPreferredMime(contentTypes);
    if (contentType) {
      // Issue with superagent and multipart/form-data (https://github.com/visionmedia/superagent/issues/746)
      if(contentType != 'multipart/form-data') {
        request.type(contentType);
      }
    } else if (!request.header['Content-Type']) {
      request.type('application/json');
    }

    if (contentType === 'application/x-www-form-urlencoded') {
      request.send(querystring.stringify(this.normalizeParams(formParams)));
    } else if (contentType == 'multipart/form-data') {
      var _formParams = this.normalizeParams(formParams);
      for (var key in _formParams) {
        if (_formParams.hasOwnProperty(key)) {
          if (this.isFileParam(_formParams[key])) {
            // file field
            request.attach(key, _formParams[key]);
          } else {
            request.field(key, _formParams[key]);
          }
        }
      }
    } else if (bodyParam) {
      request.send(bodyParam);
    }

    var accept = this.jsonPreferredMime(accepts);
    if (accept) {
      request.accept(accept);
    }

    if (returnType === 'Blob') {
      request.responseType('blob');
    } else if (returnType === 'String') {
      request.responseType('string');
    }

    // Attach previously saved cookies, if enabled
    if (this.enableCookies){
      if (typeof window === 'undefined') {
        this.agent.attachCookies(request);
      }
      else {
        request.withCredentials();
      }
    }


    request.end(function(error, response) {
      if (callback) {
        var data = null;
        if (!error) {
          try {
            data = _this.deserialize(response, returnType);
            if (_this.enableCookies && typeof window === 'undefined'){
              _this.agent.saveCookies(response);
            }
          } catch (err) {
            error = err;
          }
        }
        callback(error, data, response);
      }
    });

    return request;
  };

  /**
   * Parses an ISO-8601 string representation of a date value.
   * @param {String} str The date value as a string.
   * @returns {Date} The parsed date object.
   */
  exports.parseDate = function(str) {
    return new Date(str.replace(/T/i, ' '));
  };

  /**
   * Converts a value to the specified type.
   * @param {(String|Object)} data The data to convert, as a string or object.
   * @param {(String|Array.<String>|Object.<String, Object>|Function)} type The type to return. Pass a string for simple types
   * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
   * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
   * all properties on <code>data<code> will be converted to this type.
   * @returns An instance of the specified type or null or undefined if data is null or undefined.
   */
  exports.convertToType = function(data, type) {
    if (data === null || data === undefined)
      return data

    switch (type) {
      case 'Boolean':
        return Boolean(data);
      case 'Integer':
        return parseInt(data, 10);
      case 'Number':
        return parseFloat(data);
      case 'String':
        return String(data);
      case 'Date':
        return this.parseDate(String(data));
      case 'Blob':
      	return data;
      default:
        if (type === Object) {
          // generic object, return directly
          return data;
        } else if (typeof type === 'function') {
          // for model type like: User
          return type.constructFromObject(data);
        } else if (Array.isArray(type)) {
          // for array type like: ['String']
          var itemType = type[0];
          return data.map(function(item) {
            return exports.convertToType(item, itemType);
          });
        } else if (typeof type === 'object') {
          // for plain object type like: {'String': 'Integer'}
          var keyType, valueType;
          for (var k in type) {
            if (type.hasOwnProperty(k)) {
              keyType = k;
              valueType = type[k];
              break;
            }
          }
          var result = {};
          for (var k in data) {
            if (data.hasOwnProperty(k)) {
              var key = exports.convertToType(k, keyType);
              var value = exports.convertToType(data[k], valueType);
              result[key] = value;
            }
          }
          return result;
        } else {
          // for unknown type, return the data directly
          return data;
        }
    }
  };

  /**
   * Constructs a new map or array model from REST data.
   * @param data {Object|Array} The REST data.
   * @param obj {Object|Array} The target object or array.
   */
  exports.constructFromObject = function(data, obj, itemType) {
    if (Array.isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        if (data.hasOwnProperty(i))
          obj[i] = exports.convertToType(data[i], itemType);
      }
    } else {
      for (var k in data) {
        if (data.hasOwnProperty(k))
          obj[k] = exports.convertToType(data[k], itemType);
      }
    }
  };

  /**
   * The default API client implementation.
   * @type {module:ApiClient}
   */
  exports.instance = new exports();

  return exports;
}));

}).call(this,require("buffer").Buffer)
},{"buffer":3,"fs":2,"querystring":8,"superagent":9}],17:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/FlatErrorResponse', 'model/UserDetails'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/FlatErrorResponse'), require('../model/UserDetails'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.AccountApi = factory(root.FlatApi.ApiClient, root.FlatApi.FlatErrorResponse, root.FlatApi.UserDetails);
  }
}(this, function(ApiClient, FlatErrorResponse, UserDetails) {
  'use strict';

  /**
   * Account service.
   * @module api/AccountApi
   * @version 2.6.0
   */

  /**
   * Constructs a new AccountApi. 
   * @alias module:api/AccountApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getAuthenticatedUser operation.
     * @callback module:api/AccountApi~getAuthenticatedUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UserDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get current user profile
     * Get details about the current authenticated User. 
     * @param {module:api/AccountApi~getAuthenticatedUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UserDetails}
     */
    this.getAuthenticatedUser = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = UserDetails;

      return this.apiClient.callApi(
        '/me', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));

},{"../ApiClient":16,"../model/FlatErrorResponse":48,"../model/UserDetails":99}],18:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Assignment', 'model/AssignmentCopy', 'model/AssignmentCreation', 'model/AssignmentSubmission', 'model/AssignmentSubmissionUpdate', 'model/ClassCreation', 'model/ClassDetails', 'model/ClassUpdate', 'model/FlatErrorResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Assignment'), require('../model/AssignmentCopy'), require('../model/AssignmentCreation'), require('../model/AssignmentSubmission'), require('../model/AssignmentSubmissionUpdate'), require('../model/ClassCreation'), require('../model/ClassDetails'), require('../model/ClassUpdate'), require('../model/FlatErrorResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ClassApi = factory(root.FlatApi.ApiClient, root.FlatApi.Assignment, root.FlatApi.AssignmentCopy, root.FlatApi.AssignmentCreation, root.FlatApi.AssignmentSubmission, root.FlatApi.AssignmentSubmissionUpdate, root.FlatApi.ClassCreation, root.FlatApi.ClassDetails, root.FlatApi.ClassUpdate, root.FlatApi.FlatErrorResponse);
  }
}(this, function(ApiClient, Assignment, AssignmentCopy, AssignmentCreation, AssignmentSubmission, AssignmentSubmissionUpdate, ClassCreation, ClassDetails, ClassUpdate, FlatErrorResponse) {
  'use strict';

  /**
   * Class service.
   * @module api/ClassApi
   * @version 2.6.0
   */

  /**
   * Constructs a new ClassApi. 
   * @alias module:api/ClassApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the activateClass operation.
     * @callback module:api/ClassApi~activateClassCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ClassDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Activate the class
     * Mark the class as &#x60;active&#x60;. This is mainly used for classes synchronized from Clever that are initially with an &#x60;inactive&#x60; state and hidden in the UI. 
     * @param {String} _class Unique identifier of the class
     * @param {module:api/ClassApi~activateClassCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ClassDetails}
     */
    this.activateClass = function(_class, callback) {
      var postBody = null;

      // verify the required parameter '_class' is set
      if (_class === undefined || _class === null) {
        throw new Error("Missing the required parameter '_class' when calling activateClass");
      }


      var pathParams = {
        'class': _class
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ClassDetails;

      return this.apiClient.callApi(
        '/classes/{class}/activate', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the addClassUser operation.
     * @callback module:api/ClassApi~addClassUserCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add a user to the class
     * This method can be used by a teacher of the class to enroll another Flat user into the class.  Only users that are part of your Organization can be enrolled in a class of this same Organization.  When enrolling a user in the class, Flat will automatically add this user to the corresponding Class group, based on this role in the Organization. 
     * @param {String} _class Unique identifier of the class
     * @param {String} user Unique identifier of the user
     * @param {module:api/ClassApi~addClassUserCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.addClassUser = function(_class, user, callback) {
      var postBody = null;

      // verify the required parameter '_class' is set
      if (_class === undefined || _class === null) {
        throw new Error("Missing the required parameter '_class' when calling addClassUser");
      }

      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling addClassUser");
      }


      var pathParams = {
        'class': _class,
        'user': user
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/classes/{class}/users/{user}', 'PUT',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the archiveClass operation.
     * @callback module:api/ClassApi~archiveClassCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ClassDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Archive the class
     * Mark the class as &#x60;archived&#x60;. When this course is synchronized with another app, like Google Classroom, this state will be automatically be updated. 
     * @param {String} _class Unique identifier of the class
     * @param {module:api/ClassApi~archiveClassCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ClassDetails}
     */
    this.archiveClass = function(_class, callback) {
      var postBody = null;

      // verify the required parameter '_class' is set
      if (_class === undefined || _class === null) {
        throw new Error("Missing the required parameter '_class' when calling archiveClass");
      }


      var pathParams = {
        'class': _class
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ClassDetails;

      return this.apiClient.callApi(
        '/classes/{class}/archive', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the copyAssignment operation.
     * @callback module:api/ClassApi~copyAssignmentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Assignment} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Copy an assignment
     * Copy an assignment to a specified class.  If the original assignment has a due date in the past, this new assingment will be created without a due date.  If the new class is synchronized with an external app (e.g. Google Classroom), the copied assignment will also be posted on the external app. 
     * @param {String} _class Unique identifier of the class
     * @param {String} assignment Unique identifier of the assignment
     * @param {module:model/AssignmentCopy} body 
     * @param {module:api/ClassApi~copyAssignmentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Assignment}
     */
    this.copyAssignment = function(_class, assignment, body, callback) {
      var postBody = body;

      // verify the required parameter '_class' is set
      if (_class === undefined || _class === null) {
        throw new Error("Missing the required parameter '_class' when calling copyAssignment");
      }

      // verify the required parameter 'assignment' is set
      if (assignment === undefined || assignment === null) {
        throw new Error("Missing the required parameter 'assignment' when calling copyAssignment");
      }

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling copyAssignment");
      }


      var pathParams = {
        'class': _class,
        'assignment': assignment
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = Assignment;

      return this.apiClient.callApi(
        '/classes/{class}/assignments/{assignment}/copy', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the createAssignment operation.
     * @callback module:api/ClassApi~createAssignmentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Assignment} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Assignment creation
     * Use this method as a teacher to create and post a new assignment to a class.  If the class is synchronized with Google Classroom, the assignment will be automatically posted to your Classroom course. 
     * @param {String} _class Unique identifier of the class
     * @param {Object} opts Optional parameters
     * @param {module:model/AssignmentCreation} opts.body 
     * @param {module:api/ClassApi~createAssignmentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Assignment}
     */
    this.createAssignment = function(_class, opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];

      // verify the required parameter '_class' is set
      if (_class === undefined || _class === null) {
        throw new Error("Missing the required parameter '_class' when calling createAssignment");
      }


      var pathParams = {
        'class': _class
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = Assignment;

      return this.apiClient.callApi(
        '/classes/{class}/assignments', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the createClass operation.
     * @callback module:api/ClassApi~createClassCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ClassDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a new class
     * Classrooms on Flat allow you to create activities with assignments and post content to a specific group.  When creating a class, Flat automatically creates two groups: one for the teachers of the course, one for the students. The creator of this class is automatically added to the teachers group.  If the classsroom is synchronized with another application like Google Classroom, some of the meta information will automatically be updated.  You can add users to this class using &#x60;POST /classes/{class}/users/{user}&#x60;, they will automatically added to the group based on their role on Flat. Users can also enroll themselves to this class using &#x60;POST /classes/enroll/{enrollmentCode}&#x60; and the &#x60;enrollmentCode&#x60; returned in the &#x60;ClassDetails&#x60; response. 
     * @param {module:model/ClassCreation} body 
     * @param {module:api/ClassApi~createClassCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ClassDetails}
     */
    this.createClass = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling createClass");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ClassDetails;

      return this.apiClient.callApi(
        '/classes', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the createSubmission operation.
     * @callback module:api/ClassApi~createSubmissionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AssignmentSubmission} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create or edit a submission
     * Use this method as a student to create, update and submit a submission related to an assignment. Students can only set &#x60;attachments&#x60;, &#x60;studentComment&#x60; and &#x60;submit&#x60;.  Teachers can use &#x60;PUT /classes/{class}/assignments/{assignment}/submissions/{submission}&#x60; to update a submission by id. 
     * @param {String} _class Unique identifier of the class
     * @param {String} assignment Unique identifier of the assignment
     * @param {module:model/AssignmentSubmissionUpdate} body 
     * @param {module:api/ClassApi~createSubmissionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AssignmentSubmission}
     */
    this.createSubmission = function(_class, assignment, body, callback) {
      var postBody = body;

      // verify the required parameter '_class' is set
      if (_class === undefined || _class === null) {
        throw new Error("Missing the required parameter '_class' when calling createSubmission");
      }

      // verify the required parameter 'assignment' is set
      if (assignment === undefined || assignment === null) {
        throw new Error("Missing the required parameter 'assignment' when calling createSubmission");
      }

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling createSubmission");
      }


      var pathParams = {
        'class': _class,
        'assignment': assignment
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = AssignmentSubmission;

      return this.apiClient.callApi(
        '/classes/{class}/assignments/{assignment}/submissions', 'PUT',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteClassUser operation.
     * @callback module:api/ClassApi~deleteClassUserCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Remove a user from the class
     * This method can be used by a teacher to remove a user from the class, or by a student to leave the classroom.  Warning: Removing a user from the class will remove the associated resources, including the submissions and feedback related to these submissions. 
     * @param {String} _class Unique identifier of the class
     * @param {String} user Unique identifier of the user
     * @param {module:api/ClassApi~deleteClassUserCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteClassUser = function(_class, user, callback) {
      var postBody = null;

      // verify the required parameter '_class' is set
      if (_class === undefined || _class === null) {
        throw new Error("Missing the required parameter '_class' when calling deleteClassUser");
      }

      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling deleteClassUser");
      }


      var pathParams = {
        'class': _class,
        'user': user
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/classes/{class}/users/{user}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the editSubmission operation.
     * @callback module:api/ClassApi~editSubmissionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AssignmentSubmission} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Edit a submission
     * Use this method as a teacher to update the different submission and give feedback. Teachers can only set &#x60;returnFeedback&#x60; 
     * @param {String} _class Unique identifier of the class
     * @param {String} assignment Unique identifier of the assignment
     * @param {String} submission Unique identifier of the submission
     * @param {module:model/AssignmentSubmissionUpdate} body 
     * @param {module:api/ClassApi~editSubmissionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AssignmentSubmission}
     */
    this.editSubmission = function(_class, assignment, submission, body, callback) {
      var postBody = body;

      // verify the required parameter '_class' is set
      if (_class === undefined || _class === null) {
        throw new Error("Missing the required parameter '_class' when calling editSubmission");
      }

      // verify the required parameter 'assignment' is set
      if (assignment === undefined || assignment === null) {
        throw new Error("Missing the required parameter 'assignment' when calling editSubmission");
      }

      // verify the required parameter 'submission' is set
      if (submission === undefined || submission === null) {
        throw new Error("Missing the required parameter 'submission' when calling editSubmission");
      }

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling editSubmission");
      }


      var pathParams = {
        'class': _class,
        'assignment': assignment,
        'submission': submission
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = AssignmentSubmission;

      return this.apiClient.callApi(
        '/classes/{class}/assignments/{assignment}/submissions/{submission}', 'PUT',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the enrollClass operation.
     * @callback module:api/ClassApi~enrollClassCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ClassDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Join a class
     * Use this method to join a class using an enrollment code given one of the teacher of this class. This code is also available in the &#x60;ClassDetails&#x60; returned to the teachers when creating the class or listing / fetching a specific class.  Flat will automatically add the user to the corresponding class group based on this role in the organization. 
     * @param {String} enrollmentCode The enrollment code, available to the teacher in &#x60;ClassDetails&#x60; 
     * @param {module:api/ClassApi~enrollClassCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ClassDetails}
     */
    this.enrollClass = function(enrollmentCode, callback) {
      var postBody = null;

      // verify the required parameter 'enrollmentCode' is set
      if (enrollmentCode === undefined || enrollmentCode === null) {
        throw new Error("Missing the required parameter 'enrollmentCode' when calling enrollClass");
      }


      var pathParams = {
        'enrollmentCode': enrollmentCode
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ClassDetails;

      return this.apiClient.callApi(
        '/classes/enroll/{enrollmentCode}', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getClass operation.
     * @callback module:api/ClassApi~getClassCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ClassDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get the details of a single class
     * @param {String} _class Unique identifier of the class
     * @param {module:api/ClassApi~getClassCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ClassDetails}
     */
    this.getClass = function(_class, callback) {
      var postBody = null;

      // verify the required parameter '_class' is set
      if (_class === undefined || _class === null) {
        throw new Error("Missing the required parameter '_class' when calling getClass");
      }


      var pathParams = {
        'class': _class
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ClassDetails;

      return this.apiClient.callApi(
        '/classes/{class}', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getScoreSubmissions operation.
     * @callback module:api/ClassApi~getScoreSubmissionsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/AssignmentSubmission>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List submissions related to the score
     * This API call will list the different assignments submissions where the score is attached. This method can be used by anyone that are part of the organization and have at least read access to the document. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {module:api/ClassApi~getScoreSubmissionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/AssignmentSubmission>}
     */
    this.getScoreSubmissions = function(score, callback) {
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling getScoreSubmissions");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [AssignmentSubmission];

      return this.apiClient.callApi(
        '/scores/{score}/submissions', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getSubmission operation.
     * @callback module:api/ClassApi~getSubmissionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AssignmentSubmission} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get a student submission
     * @param {String} _class Unique identifier of the class
     * @param {String} assignment Unique identifier of the assignment
     * @param {String} submission Unique identifier of the submission
     * @param {module:api/ClassApi~getSubmissionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AssignmentSubmission}
     */
    this.getSubmission = function(_class, assignment, submission, callback) {
      var postBody = null;

      // verify the required parameter '_class' is set
      if (_class === undefined || _class === null) {
        throw new Error("Missing the required parameter '_class' when calling getSubmission");
      }

      // verify the required parameter 'assignment' is set
      if (assignment === undefined || assignment === null) {
        throw new Error("Missing the required parameter 'assignment' when calling getSubmission");
      }

      // verify the required parameter 'submission' is set
      if (submission === undefined || submission === null) {
        throw new Error("Missing the required parameter 'submission' when calling getSubmission");
      }


      var pathParams = {
        'class': _class,
        'assignment': assignment,
        'submission': submission
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = AssignmentSubmission;

      return this.apiClient.callApi(
        '/classes/{class}/assignments/{assignment}/submissions/{submission}', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getSubmissions operation.
     * @callback module:api/ClassApi~getSubmissionsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/AssignmentSubmission>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List the students&#39; submissions
     * @param {String} _class Unique identifier of the class
     * @param {String} assignment Unique identifier of the assignment
     * @param {module:api/ClassApi~getSubmissionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/AssignmentSubmission>}
     */
    this.getSubmissions = function(_class, assignment, callback) {
      var postBody = null;

      // verify the required parameter '_class' is set
      if (_class === undefined || _class === null) {
        throw new Error("Missing the required parameter '_class' when calling getSubmissions");
      }

      // verify the required parameter 'assignment' is set
      if (assignment === undefined || assignment === null) {
        throw new Error("Missing the required parameter 'assignment' when calling getSubmissions");
      }


      var pathParams = {
        'class': _class,
        'assignment': assignment
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [AssignmentSubmission];

      return this.apiClient.callApi(
        '/classes/{class}/assignments/{assignment}/submissions', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the listAssignments operation.
     * @callback module:api/ClassApi~listAssignmentsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Assignment>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Assignments listing
     * @param {String} _class Unique identifier of the class
     * @param {module:api/ClassApi~listAssignmentsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Assignment>}
     */
    this.listAssignments = function(_class, callback) {
      var postBody = null;

      // verify the required parameter '_class' is set
      if (_class === undefined || _class === null) {
        throw new Error("Missing the required parameter '_class' when calling listAssignments");
      }


      var pathParams = {
        'class': _class
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [Assignment];

      return this.apiClient.callApi(
        '/classes/{class}/assignments', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the listClassStudentSubmissions operation.
     * @callback module:api/ClassApi~listClassStudentSubmissionsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/AssignmentSubmission>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List the submissions for a student
     * Use this method as a teacher to list all the assignment submissions sent by a student of the class 
     * @param {String} _class Unique identifier of the class
     * @param {String} user Unique identifier of the user
     * @param {module:api/ClassApi~listClassStudentSubmissionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/AssignmentSubmission>}
     */
    this.listClassStudentSubmissions = function(_class, user, callback) {
      var postBody = null;

      // verify the required parameter '_class' is set
      if (_class === undefined || _class === null) {
        throw new Error("Missing the required parameter '_class' when calling listClassStudentSubmissions");
      }

      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling listClassStudentSubmissions");
      }


      var pathParams = {
        'class': _class,
        'user': user
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [AssignmentSubmission];

      return this.apiClient.callApi(
        '/classes/{class}/students/{user}/submissions', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the listClasses operation.
     * @callback module:api/ClassApi~listClassesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ClassDetails>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List the classes available for the current user
     * @param {Object} opts Optional parameters
     * @param {module:model/String} opts.state Filter the classes by state (default to active)
     * @param {module:api/ClassApi~listClassesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ClassDetails>}
     */
    this.listClasses = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'state': opts['state'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ClassDetails];

      return this.apiClient.callApi(
        '/classes', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the unarchiveClass operation.
     * @callback module:api/ClassApi~unarchiveClassCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ClassDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Unarchive the class
     * Mark the class as &#x60;active&#x60;. When this course is synchronized with another app, like Google Classroom, this state will be automatically be updated. 
     * @param {String} _class Unique identifier of the class
     * @param {module:api/ClassApi~unarchiveClassCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ClassDetails}
     */
    this.unarchiveClass = function(_class, callback) {
      var postBody = null;

      // verify the required parameter '_class' is set
      if (_class === undefined || _class === null) {
        throw new Error("Missing the required parameter '_class' when calling unarchiveClass");
      }


      var pathParams = {
        'class': _class
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ClassDetails;

      return this.apiClient.callApi(
        '/classes/{class}/archive', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the updateClass operation.
     * @callback module:api/ClassApi~updateClassCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ClassDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update the class
     * Update the meta information of the class 
     * @param {String} _class Unique identifier of the class
     * @param {Object} opts Optional parameters
     * @param {module:model/ClassUpdate} opts.body Details of the Class
     * @param {module:api/ClassApi~updateClassCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ClassDetails}
     */
    this.updateClass = function(_class, opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];

      // verify the required parameter '_class' is set
      if (_class === undefined || _class === null) {
        throw new Error("Missing the required parameter '_class' when calling updateClass");
      }


      var pathParams = {
        'class': _class
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ClassDetails;

      return this.apiClient.callApi(
        '/classes/{class}', 'PUT',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));

},{"../ApiClient":16,"../model/Assignment":25,"../model/AssignmentCopy":26,"../model/AssignmentCreation":27,"../model/AssignmentSubmission":28,"../model/AssignmentSubmissionUpdate":29,"../model/ClassCreation":31,"../model/ClassDetails":32,"../model/ClassUpdate":40,"../model/FlatErrorResponse":48}],19:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Collection', 'model/CollectionCreation', 'model/CollectionModification', 'model/FlatErrorResponse', 'model/ScoreDetails'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Collection'), require('../model/CollectionCreation'), require('../model/CollectionModification'), require('../model/FlatErrorResponse'), require('../model/ScoreDetails'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.CollectionApi = factory(root.FlatApi.ApiClient, root.FlatApi.Collection, root.FlatApi.CollectionCreation, root.FlatApi.CollectionModification, root.FlatApi.FlatErrorResponse, root.FlatApi.ScoreDetails);
  }
}(this, function(ApiClient, Collection, CollectionCreation, CollectionModification, FlatErrorResponse, ScoreDetails) {
  'use strict';

  /**
   * Collection service.
   * @module api/CollectionApi
   * @version 2.6.0
   */

  /**
   * Constructs a new CollectionApi. 
   * @alias module:api/CollectionApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the addScoreToCollection operation.
     * @callback module:api/CollectionApi~addScoreToCollectionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add a score to the collection
     * This operation will add a score to a collection. The default behavior will make the score available across multiple collections. You must have the capability &#x60;canAddScores&#x60; on the provided &#x60;collection&#x60; to perform the action. 
     * @param {String} collection Unique identifier of the collection. The following aliases are supported: - &#x60;root&#x60;: The root collection of the account - &#x60;sharedWithMe&#x60;: Automatically contains new resources that have been shared individually - &#x60;trash&#x60;: Automatically contains resources that have been deleted 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {Object} opts Optional parameters
     * @param {String} opts.sharingKey This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document. 
     * @param {module:api/CollectionApi~addScoreToCollectionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreDetails}
     */
    this.addScoreToCollection = function(collection, score, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'collection' is set
      if (collection === undefined || collection === null) {
        throw new Error("Missing the required parameter 'collection' when calling addScoreToCollection");
      }

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling addScoreToCollection");
      }


      var pathParams = {
        'collection': collection,
        'score': score
      };
      var queryParams = {
        'sharingKey': opts['sharingKey'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreDetails;

      return this.apiClient.callApi(
        '/collections/{collection}/scores/{score}', 'PUT',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the createCollection operation.
     * @callback module:api/CollectionApi~createCollectionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Collection} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a new collection
     * This method will create a new collection and add it to your &#x60;root&#x60; collection. 
     * @param {module:model/CollectionCreation} body 
     * @param {module:api/CollectionApi~createCollectionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Collection}
     */
    this.createCollection = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling createCollection");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = Collection;

      return this.apiClient.callApi(
        '/collections', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteCollection operation.
     * @callback module:api/CollectionApi~deleteCollectionCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete the collection
     * This method will schedule the deletion of the collection. Until deleted, the collection will be available in the &#x60;trash&#x60;. 
     * @param {String} collection Unique identifier of the collection. The following aliases are supported: - &#x60;root&#x60;: The root collection of the account - &#x60;sharedWithMe&#x60;: Automatically contains new resources that have been shared individually - &#x60;trash&#x60;: Automatically contains resources that have been deleted 
     * @param {module:api/CollectionApi~deleteCollectionCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteCollection = function(collection, callback) {
      var postBody = null;

      // verify the required parameter 'collection' is set
      if (collection === undefined || collection === null) {
        throw new Error("Missing the required parameter 'collection' when calling deleteCollection");
      }


      var pathParams = {
        'collection': collection
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/collections/{collection}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteScoreFromCollection operation.
     * @callback module:api/CollectionApi~deleteScoreFromCollectionCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a score from the collection
     * This method will delete a score from the collection. Unlike [&#x60;DELETE /scores/{score}&#x60;](#operation/deleteScore), this score will not remove the score from your account, but only from the collection. This can be used to *move* a score from one collection to another, or simply remove a score from one collection when this one is contained in multiple collections. 
     * @param {String} collection Unique identifier of the collection. The following aliases are supported: - &#x60;root&#x60;: The root collection of the account - &#x60;sharedWithMe&#x60;: Automatically contains new resources that have been shared individually - &#x60;trash&#x60;: Automatically contains resources that have been deleted 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {module:api/CollectionApi~deleteScoreFromCollectionCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteScoreFromCollection = function(collection, score, callback) {
      var postBody = null;

      // verify the required parameter 'collection' is set
      if (collection === undefined || collection === null) {
        throw new Error("Missing the required parameter 'collection' when calling deleteScoreFromCollection");
      }

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling deleteScoreFromCollection");
      }


      var pathParams = {
        'collection': collection,
        'score': score
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/collections/{collection}/scores/{score}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the editCollection operation.
     * @callback module:api/CollectionApi~editCollectionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Collection} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update a collection&#39;s metadata
     * @param {String} collection Unique identifier of the collection. The following aliases are supported: - &#x60;root&#x60;: The root collection of the account - &#x60;sharedWithMe&#x60;: Automatically contains new resources that have been shared individually - &#x60;trash&#x60;: Automatically contains resources that have been deleted 
     * @param {Object} opts Optional parameters
     * @param {module:model/CollectionModification} opts.body 
     * @param {module:api/CollectionApi~editCollectionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Collection}
     */
    this.editCollection = function(collection, opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];

      // verify the required parameter 'collection' is set
      if (collection === undefined || collection === null) {
        throw new Error("Missing the required parameter 'collection' when calling editCollection");
      }


      var pathParams = {
        'collection': collection
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = Collection;

      return this.apiClient.callApi(
        '/collections/{collection}', 'PUT',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getCollection operation.
     * @callback module:api/CollectionApi~getCollectionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Collection} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get collection details
     * @param {String} collection Unique identifier of the collection. The following aliases are supported: - &#x60;root&#x60;: The root collection of the account - &#x60;sharedWithMe&#x60;: Automatically contains new resources that have been shared individually - &#x60;trash&#x60;: Automatically contains resources that have been deleted 
     * @param {Object} opts Optional parameters
     * @param {String} opts.sharingKey This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document. 
     * @param {module:api/CollectionApi~getCollectionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Collection}
     */
    this.getCollection = function(collection, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'collection' is set
      if (collection === undefined || collection === null) {
        throw new Error("Missing the required parameter 'collection' when calling getCollection");
      }


      var pathParams = {
        'collection': collection
      };
      var queryParams = {
        'sharingKey': opts['sharingKey'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = Collection;

      return this.apiClient.callApi(
        '/collections/{collection}', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the listCollectionScores operation.
     * @callback module:api/CollectionApi~listCollectionScoresCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ScoreDetails>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List the scores contained in a collection
     * Use this method to list the scores contained in a collection. If no sort option is provided, the scores are sorted by &#x60;modificationDate&#x60; &#x60;desc&#x60;. 
     * @param {String} collection Unique identifier of the collection. The following aliases are supported: - &#x60;root&#x60;: The root collection of the account - &#x60;sharedWithMe&#x60;: Automatically contains new resources that have been shared individually - &#x60;trash&#x60;: Automatically contains resources that have been deleted 
     * @param {Object} opts Optional parameters
     * @param {String} opts.sharingKey This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document. 
     * @param {module:model/String} opts.sort Sort
     * @param {module:model/String} opts.direction Sort direction
     * @param {Number} opts.limit This is the maximum number of objects that may be returned (default to 25)
     * @param {String} opts.next An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data. 
     * @param {String} opts.previous An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data. 
     * @param {module:api/CollectionApi~listCollectionScoresCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ScoreDetails>}
     */
    this.listCollectionScores = function(collection, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'collection' is set
      if (collection === undefined || collection === null) {
        throw new Error("Missing the required parameter 'collection' when calling listCollectionScores");
      }


      var pathParams = {
        'collection': collection
      };
      var queryParams = {
        'sharingKey': opts['sharingKey'],
        'sort': opts['sort'],
        'direction': opts['direction'],
        'limit': opts['limit'],
        'next': opts['next'],
        'previous': opts['previous'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ScoreDetails];

      return this.apiClient.callApi(
        '/collections/{collection}/scores', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the listCollections operation.
     * @callback module:api/CollectionApi~listCollectionsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Collection>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List the collections
     * Use this method to list the user&#39;s collections contained in &#x60;parent&#x60; (by default in the &#x60;root&#x60; collection). If no sort option is provided, the collections are sorted by &#x60;creationDate&#x60; &#x60;desc&#x60;.  Note that this method will not include the &#x60;parent&#x60; collection in the listing. For example, if you need the details of the &#x60;root&#x60; collection, you can use &#x60;GET /v2/collections/root&#x60;. 
     * @param {Object} opts Optional parameters
     * @param {module:model/String} opts.parent List the collection contained in this &#x60;parent&#x60; collection.  This option doesn&#39;t provide a complete multi-level collection support. When sharing a collection with someone, this one will have as &#x60;parent&#x60; &#x60;sharedWithMe&#x60;.  (default to root)
     * @param {module:model/String} opts.sort Sort
     * @param {module:model/String} opts.direction Sort direction
     * @param {Number} opts.limit This is the maximum number of objects that may be returned (default to 25)
     * @param {String} opts.next An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data. 
     * @param {String} opts.previous An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data. 
     * @param {module:api/CollectionApi~listCollectionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Collection>}
     */
    this.listCollections = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'parent': opts['parent'],
        'sort': opts['sort'],
        'direction': opts['direction'],
        'limit': opts['limit'],
        'next': opts['next'],
        'previous': opts['previous'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [Collection];

      return this.apiClient.callApi(
        '/collections', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the untrashCollection operation.
     * @callback module:api/CollectionApi~untrashCollectionCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Untrash a collection
     * This method will restore the collection by removing it from the &#x60;trash&#x60; and add it back to the &#x60;root&#x60; collection. 
     * @param {String} collection Unique identifier of the collection. The following aliases are supported: - &#x60;root&#x60;: The root collection of the account - &#x60;sharedWithMe&#x60;: Automatically contains new resources that have been shared individually - &#x60;trash&#x60;: Automatically contains resources that have been deleted 
     * @param {module:api/CollectionApi~untrashCollectionCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.untrashCollection = function(collection, callback) {
      var postBody = null;

      // verify the required parameter 'collection' is set
      if (collection === undefined || collection === null) {
        throw new Error("Missing the required parameter 'collection' when calling untrashCollection");
      }


      var pathParams = {
        'collection': collection
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/collections/{collection}/untrash', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));

},{"../ApiClient":16,"../model/Collection":41,"../model/CollectionCreation":43,"../model/CollectionModification":44,"../model/FlatErrorResponse":48,"../model/ScoreDetails":78}],20:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/FlatErrorResponse', 'model/GroupDetails', 'model/ScoreDetails', 'model/UserPublic'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/FlatErrorResponse'), require('../model/GroupDetails'), require('../model/ScoreDetails'), require('../model/UserPublic'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.GroupApi = factory(root.FlatApi.ApiClient, root.FlatApi.FlatErrorResponse, root.FlatApi.GroupDetails, root.FlatApi.ScoreDetails, root.FlatApi.UserPublic);
  }
}(this, function(ApiClient, FlatErrorResponse, GroupDetails, ScoreDetails, UserPublic) {
  'use strict';

  /**
   * Group service.
   * @module api/GroupApi
   * @version 2.6.0
   */

  /**
   * Constructs a new GroupApi. 
   * @alias module:api/GroupApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getGroupDetails operation.
     * @callback module:api/GroupApi~getGroupDetailsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GroupDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get group information
     * @param {String} group Unique identifier of a Flat group 
     * @param {module:api/GroupApi~getGroupDetailsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GroupDetails}
     */
    this.getGroupDetails = function(group, callback) {
      var postBody = null;

      // verify the required parameter 'group' is set
      if (group === undefined || group === null) {
        throw new Error("Missing the required parameter 'group' when calling getGroupDetails");
      }


      var pathParams = {
        'group': group
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = GroupDetails;

      return this.apiClient.callApi(
        '/groups/{group}', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getGroupScores operation.
     * @callback module:api/GroupApi~getGroupScoresCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ScoreDetails>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List group&#39;s scores
     * Get the list of scores shared with a group. 
     * @param {String} group Unique identifier of a Flat group 
     * @param {Object} opts Optional parameters
     * @param {String} opts.parent Filter the score forked from the score id &#x60;parent&#x60;
     * @param {module:api/GroupApi~getGroupScoresCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ScoreDetails>}
     */
    this.getGroupScores = function(group, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'group' is set
      if (group === undefined || group === null) {
        throw new Error("Missing the required parameter 'group' when calling getGroupScores");
      }


      var pathParams = {
        'group': group
      };
      var queryParams = {
        'parent': opts['parent'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ScoreDetails];

      return this.apiClient.callApi(
        '/groups/{group}/scores', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the listGroupUsers operation.
     * @callback module:api/GroupApi~listGroupUsersCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/UserPublic>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List group&#39;s users
     * @param {String} group Unique identifier of a Flat group 
     * @param {module:api/GroupApi~listGroupUsersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/UserPublic>}
     */
    this.listGroupUsers = function(group, callback) {
      var postBody = null;

      // verify the required parameter 'group' is set
      if (group === undefined || group === null) {
        throw new Error("Missing the required parameter 'group' when calling listGroupUsers");
      }


      var pathParams = {
        'group': group
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [UserPublic];

      return this.apiClient.callApi(
        '/groups/{group}/users', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));

},{"../ApiClient":16,"../model/FlatErrorResponse":48,"../model/GroupDetails":53,"../model/ScoreDetails":78,"../model/UserPublic":103}],21:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/FlatErrorResponse', 'model/LtiCredentials', 'model/LtiCredentialsCreation', 'model/OrganizationInvitation', 'model/OrganizationInvitationCreation', 'model/UserAdminUpdate', 'model/UserCreation', 'model/UserDetailsAdmin'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/FlatErrorResponse'), require('../model/LtiCredentials'), require('../model/LtiCredentialsCreation'), require('../model/OrganizationInvitation'), require('../model/OrganizationInvitationCreation'), require('../model/UserAdminUpdate'), require('../model/UserCreation'), require('../model/UserDetailsAdmin'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.OrganizationApi = factory(root.FlatApi.ApiClient, root.FlatApi.FlatErrorResponse, root.FlatApi.LtiCredentials, root.FlatApi.LtiCredentialsCreation, root.FlatApi.OrganizationInvitation, root.FlatApi.OrganizationInvitationCreation, root.FlatApi.UserAdminUpdate, root.FlatApi.UserCreation, root.FlatApi.UserDetailsAdmin);
  }
}(this, function(ApiClient, FlatErrorResponse, LtiCredentials, LtiCredentialsCreation, OrganizationInvitation, OrganizationInvitationCreation, UserAdminUpdate, UserCreation, UserDetailsAdmin) {
  'use strict';

  /**
   * Organization service.
   * @module api/OrganizationApi
   * @version 2.6.0
   */

  /**
   * Constructs a new OrganizationApi. 
   * @alias module:api/OrganizationApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the createLtiCredentials operation.
     * @callback module:api/OrganizationApi~createLtiCredentialsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/LtiCredentials} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a new couple of LTI 1.x credentials
     * Flat for Education is a Certified LTI Provider. You can use these API methods to automate the creation of LTI credentials. You can read more about our LTI implementation, supported components and LTI Endpoints in our [Developer Documentation](https://flat.io/developers/docs/lti/). 
     * @param {module:model/LtiCredentialsCreation} body 
     * @param {module:api/OrganizationApi~createLtiCredentialsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/LtiCredentials}
     */
    this.createLtiCredentials = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling createLtiCredentials");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = LtiCredentials;

      return this.apiClient.callApi(
        '/organizations/lti/credentials', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the createOrganizationInvitation operation.
     * @callback module:api/OrganizationApi~createOrganizationInvitationCallback
     * @param {String} error Error message, if any.
     * @param {module:model/OrganizationInvitation} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a new invitation to join the organization
     * This method creates and sends invitation for teachers and admins.  Invitations can only be used by new Flat users or users who are not part of the organization yet.  If the email of the user is already associated to a user of your organization, the API will simply update the role of the existing user and won&#39;t send an invitation. In this case, the property &#x60;usedBy&#x60; will be directly filled with the uniquer identifier of the corresponding user. 
     * @param {Object} opts Optional parameters
     * @param {module:model/OrganizationInvitationCreation} opts.body 
     * @param {module:api/OrganizationApi~createOrganizationInvitationCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/OrganizationInvitation}
     */
    this.createOrganizationInvitation = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = OrganizationInvitation;

      return this.apiClient.callApi(
        '/organizations/invitations', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the createOrganizationUser operation.
     * @callback module:api/OrganizationApi~createOrganizationUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UserDetailsAdmin} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a new user account
     * @param {Object} opts Optional parameters
     * @param {module:model/UserCreation} opts.body 
     * @param {module:api/OrganizationApi~createOrganizationUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UserDetailsAdmin}
     */
    this.createOrganizationUser = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = UserDetailsAdmin;

      return this.apiClient.callApi(
        '/organizations/users', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the listLtiCredentials operation.
     * @callback module:api/OrganizationApi~listLtiCredentialsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/LtiCredentials>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List LTI 1.x credentials
     * @param {module:api/OrganizationApi~listLtiCredentialsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/LtiCredentials>}
     */
    this.listLtiCredentials = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [LtiCredentials];

      return this.apiClient.callApi(
        '/organizations/lti/credentials', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the listOrganizationInvitations operation.
     * @callback module:api/OrganizationApi~listOrganizationInvitationsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/OrganizationInvitation>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List the organization invitations
     * @param {Object} opts Optional parameters
     * @param {module:model/String} opts.role Filter users by role
     * @param {Number} opts.limit This is the maximum number of objects that may be returned (default to 50)
     * @param {String} opts.next An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data. 
     * @param {String} opts.previous An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data. 
     * @param {module:api/OrganizationApi~listOrganizationInvitationsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/OrganizationInvitation>}
     */
    this.listOrganizationInvitations = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'role': opts['role'],
        'limit': opts['limit'],
        'next': opts['next'],
        'previous': opts['previous'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [OrganizationInvitation];

      return this.apiClient.callApi(
        '/organizations/invitations', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the listOrganizationUsers operation.
     * @callback module:api/OrganizationApi~listOrganizationUsersCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/UserDetailsAdmin>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List the organization users
     * @param {Object} opts Optional parameters
     * @param {module:model/String} opts.role Filter users by role
     * @param {Number} opts.limit This is the maximum number of objects that may be returned (default to 50)
     * @param {String} opts.next An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data. 
     * @param {String} opts.previous An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data. 
     * @param {module:api/OrganizationApi~listOrganizationUsersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/UserDetailsAdmin>}
     */
    this.listOrganizationUsers = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'role': opts['role'],
        'limit': opts['limit'],
        'next': opts['next'],
        'previous': opts['previous'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [UserDetailsAdmin];

      return this.apiClient.callApi(
        '/organizations/users', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the removeOrganizationInvitation operation.
     * @callback module:api/OrganizationApi~removeOrganizationInvitationCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Remove an organization invitation
     * @param {String} invitation Unique identifier of the invitation
     * @param {module:api/OrganizationApi~removeOrganizationInvitationCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.removeOrganizationInvitation = function(invitation, callback) {
      var postBody = null;

      // verify the required parameter 'invitation' is set
      if (invitation === undefined || invitation === null) {
        throw new Error("Missing the required parameter 'invitation' when calling removeOrganizationInvitation");
      }


      var pathParams = {
        'invitation': invitation
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/organizations/invitations/{invitation}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the removeOrganizationUser operation.
     * @callback module:api/OrganizationApi~removeOrganizationUserCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Remove an account from Flat
     * This operation removes an account from Flat and its data, including: * The music scores created by this user (documents, history, comments, collaboration information) * Education related data (assignments and classroom information) 
     * @param {String} user Unique identifier of the Flat account 
     * @param {Object} opts Optional parameters
     * @param {Boolean} opts.convertToIndividual If &#x60;true&#x60;, the account will be only removed from the organization and converted into an individual account on our public website, https://flat.io. This operation will remove the education-related data from the account. Before realizing this operation, you need to be sure that the user is at least 13 years old and that this one has read and agreed to the Individual Terms of Services of Flat available on https://flat.io/legal. 
     * @param {module:api/OrganizationApi~removeOrganizationUserCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.removeOrganizationUser = function(user, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling removeOrganizationUser");
      }


      var pathParams = {
        'user': user
      };
      var queryParams = {
        'convertToIndividual': opts['convertToIndividual'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/organizations/users/{user}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the revokeLtiCredentials operation.
     * @callback module:api/OrganizationApi~revokeLtiCredentialsCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Revoke LTI 1.x credentials
     * @param {String} credentials Credentials unique identifier 
     * @param {module:api/OrganizationApi~revokeLtiCredentialsCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.revokeLtiCredentials = function(credentials, callback) {
      var postBody = null;

      // verify the required parameter 'credentials' is set
      if (credentials === undefined || credentials === null) {
        throw new Error("Missing the required parameter 'credentials' when calling revokeLtiCredentials");
      }


      var pathParams = {
        'credentials': credentials
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/organizations/lti/credentials/{credentials}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the updateOrganizationUser operation.
     * @callback module:api/OrganizationApi~updateOrganizationUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UserDetailsAdmin} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update account information
     * @param {String} user Unique identifier of the Flat account 
     * @param {module:model/UserAdminUpdate} body 
     * @param {module:api/OrganizationApi~updateOrganizationUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UserDetailsAdmin}
     */
    this.updateOrganizationUser = function(user, body, callback) {
      var postBody = body;

      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling updateOrganizationUser");
      }

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling updateOrganizationUser");
      }


      var pathParams = {
        'user': user
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = UserDetailsAdmin;

      return this.apiClient.callApi(
        '/organizations/users/{user}', 'PUT',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));

},{"../ApiClient":16,"../model/FlatErrorResponse":48,"../model/LtiCredentials":58,"../model/LtiCredentialsCreation":59,"../model/OrganizationInvitation":62,"../model/OrganizationInvitationCreation":63,"../model/UserAdminUpdate":96,"../model/UserCreation":98,"../model/UserDetailsAdmin":100}],22:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/AssignmentSubmission', 'model/FlatErrorResponse', 'model/ResourceCollaborator', 'model/ResourceCollaboratorCreation', 'model/ScoreComment', 'model/ScoreCommentCreation', 'model/ScoreCommentUpdate', 'model/ScoreCreation', 'model/ScoreDetails', 'model/ScoreFork', 'model/ScoreModification', 'model/ScoreRevision', 'model/ScoreRevisionCreation', 'model/ScoreTrack', 'model/ScoreTrackCreation', 'model/ScoreTrackUpdate'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/AssignmentSubmission'), require('../model/FlatErrorResponse'), require('../model/ResourceCollaborator'), require('../model/ResourceCollaboratorCreation'), require('../model/ScoreComment'), require('../model/ScoreCommentCreation'), require('../model/ScoreCommentUpdate'), require('../model/ScoreCreation'), require('../model/ScoreDetails'), require('../model/ScoreFork'), require('../model/ScoreModification'), require('../model/ScoreRevision'), require('../model/ScoreRevisionCreation'), require('../model/ScoreTrack'), require('../model/ScoreTrackCreation'), require('../model/ScoreTrackUpdate'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreApi = factory(root.FlatApi.ApiClient, root.FlatApi.AssignmentSubmission, root.FlatApi.FlatErrorResponse, root.FlatApi.ResourceCollaborator, root.FlatApi.ResourceCollaboratorCreation, root.FlatApi.ScoreComment, root.FlatApi.ScoreCommentCreation, root.FlatApi.ScoreCommentUpdate, root.FlatApi.ScoreCreation, root.FlatApi.ScoreDetails, root.FlatApi.ScoreFork, root.FlatApi.ScoreModification, root.FlatApi.ScoreRevision, root.FlatApi.ScoreRevisionCreation, root.FlatApi.ScoreTrack, root.FlatApi.ScoreTrackCreation, root.FlatApi.ScoreTrackUpdate);
  }
}(this, function(ApiClient, AssignmentSubmission, FlatErrorResponse, ResourceCollaborator, ResourceCollaboratorCreation, ScoreComment, ScoreCommentCreation, ScoreCommentUpdate, ScoreCreation, ScoreDetails, ScoreFork, ScoreModification, ScoreRevision, ScoreRevisionCreation, ScoreTrack, ScoreTrackCreation, ScoreTrackUpdate) {
  'use strict';

  /**
   * Score service.
   * @module api/ScoreApi
   * @version 2.6.0
   */

  /**
   * Constructs a new ScoreApi. 
   * @alias module:api/ScoreApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the addScoreCollaborator operation.
     * @callback module:api/ScoreApi~addScoreCollaboratorCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ResourceCollaborator} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add a new collaborator
     * Share a score with a single user or a group. This API call allows to add, invite and update the collaborators of a resource. - To add an existing Flat user to the resource, specify its unique identifier in the &#x60;user&#x60; property. - To invite an external user to the resource, specify its email in the &#x60;userEmail&#x60; property. - To add a Flat group to the resource, specify its unique identifier in the &#x60;group&#x60; property. - To update an existing collaborator, process the same request with different rights. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {module:model/ResourceCollaboratorCreation} body 
     * @param {module:api/ScoreApi~addScoreCollaboratorCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ResourceCollaborator}
     */
    this.addScoreCollaborator = function(score, body, callback) {
      var postBody = body;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling addScoreCollaborator");
      }

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling addScoreCollaborator");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ResourceCollaborator;

      return this.apiClient.callApi(
        '/scores/{score}/collaborators', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the addScoreTrack operation.
     * @callback module:api/ScoreApi~addScoreTrackCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreTrack} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add a new video or audio track to the score
     * Use this method to add new track to the score. This track can then be played on flat.io or in an embedded score. This API method support medias hosted on SoundCloud, YouTube and Vimeo. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {module:model/ScoreTrackCreation} body 
     * @param {module:api/ScoreApi~addScoreTrackCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreTrack}
     */
    this.addScoreTrack = function(score, body, callback) {
      var postBody = body;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling addScoreTrack");
      }

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling addScoreTrack");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreTrack;

      return this.apiClient.callApi(
        '/scores/{score}/tracks', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the createScore operation.
     * @callback module:api/ScoreApi~createScoreCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a new score
     * Use this API method to **create a new music score in the current User account**. You will need a MusicXML 3 (&#x60;vnd.recordare.musicxml&#x60; or &#x60;vnd.recordare.musicxml+xml&#x60;) or a MIDI (&#x60;audio/midi&#x60;) file to create the new Flat document.  This API call will automatically create the first revision of the document, the score can be modified by the using our web application or by uploading a new revision of this file (&#x60;POST /v2/scores/{score}/revisions/{revision}&#x60;).  The currently authenticated user will be granted owner of the file and will be able to add other collaborators (users and groups).  If no &#x60;collection&#x60; is specified, the API will create the score in the most appropriate collection. This can be the &#x60;root&#x60; collection or a different collection based on the user&#39;s settings or API authentication method. If a &#x60;collection&#x60; is specified and this one has more public privacy settings than the score (e.g. &#x60;public&#x60; vs &#x60;private&#x60; for the score), the privacy settings of the created score will be adjusted to the collection ones. You can check the adjusted privacy settings in the returned score &#x60;privacy&#x60;, and optionally adjust these settings if needed using &#x60;PUT /scores/{score}&#x60;. 
     * @param {module:model/ScoreCreation} body 
     * @param {module:api/ScoreApi~createScoreCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreDetails}
     */
    this.createScore = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling createScore");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreDetails;

      return this.apiClient.callApi(
        '/scores', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the createScoreRevision operation.
     * @callback module:api/ScoreApi~createScoreRevisionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreRevision} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a new revision
     * Update a score by uploading a new revision for this one. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {module:model/ScoreRevisionCreation} body 
     * @param {module:api/ScoreApi~createScoreRevisionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreRevision}
     */
    this.createScoreRevision = function(score, body, callback) {
      var postBody = body;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling createScoreRevision");
      }

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling createScoreRevision");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreRevision;

      return this.apiClient.callApi(
        '/scores/{score}/revisions', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteScore operation.
     * @callback module:api/ScoreApi~deleteScoreCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a score
     * This method can be used by the owner/admin (&#x60;aclAdmin&#x60; rights) of a score as well as regular collaborators.  When called by an owner/admin, it will schedule the deletion of the score, its revisions, and complete history. The score won&#39;t be accessible anymore after calling this method and the user&#39;s quota will directly be updated.  When called by a regular collaborator (&#x60;aclRead&#x60; / &#x60;aclWrite&#x60;), the score will be unshared (i.e. removed from the account &amp; own collections). 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {module:api/ScoreApi~deleteScoreCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteScore = function(score, callback) {
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling deleteScore");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/scores/{score}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteScoreComment operation.
     * @callback module:api/ScoreApi~deleteScoreCommentCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a comment
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {String} comment Unique identifier of a sheet music comment 
     * @param {Object} opts Optional parameters
     * @param {String} opts.sharingKey This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document. 
     * @param {module:api/ScoreApi~deleteScoreCommentCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteScoreComment = function(score, comment, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling deleteScoreComment");
      }

      // verify the required parameter 'comment' is set
      if (comment === undefined || comment === null) {
        throw new Error("Missing the required parameter 'comment' when calling deleteScoreComment");
      }


      var pathParams = {
        'score': score,
        'comment': comment
      };
      var queryParams = {
        'sharingKey': opts['sharingKey'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/scores/{score}/comments/{comment}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteScoreTrack operation.
     * @callback module:api/ScoreApi~deleteScoreTrackCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Remove an audio or video track linked to the score
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {String} track Unique identifier of a score audio track 
     * @param {module:api/ScoreApi~deleteScoreTrackCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteScoreTrack = function(score, track, callback) {
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling deleteScoreTrack");
      }

      // verify the required parameter 'track' is set
      if (track === undefined || track === null) {
        throw new Error("Missing the required parameter 'track' when calling deleteScoreTrack");
      }


      var pathParams = {
        'score': score,
        'track': track
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/scores/{score}/tracks/{track}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the editScore operation.
     * @callback module:api/ScoreApi~editScoreCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Edit a score&#39;s metadata
     * This API method allows you to change the metadata of a score document (e.g. its &#x60;title&#x60; or &#x60;privacy&#x60;), all the properties are optional.  To edit the file itself, create a new revision using the appropriate method (&#x60;POST /v2/scores/{score}/revisions/{revision}&#x60;).  When editing the &#x60;title&#x60; of the score, the API metadata are updated directly when calling this method, unlike the data itself. The title in the score data will be \&quot;lazy\&quot; updated at the next score save with the editor or our internal save. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {Object} opts Optional parameters
     * @param {module:model/ScoreModification} opts.body 
     * @param {module:api/ScoreApi~editScoreCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreDetails}
     */
    this.editScore = function(score, opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling editScore");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreDetails;

      return this.apiClient.callApi(
        '/scores/{score}', 'PUT',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the forkScore operation.
     * @callback module:api/ScoreApi~forkScoreCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Fork a score
     * This API call will make a copy of the last revision of the specified score and create a new score. The copy of the score will have a privacy set to &#x60;private&#x60;.  When using a [Flat for Education](https://flat.io/edu) account, the inline and contextualized comments will be accessible in the child document. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {module:model/ScoreFork} body 
     * @param {Object} opts Optional parameters
     * @param {String} opts.sharingKey This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document. 
     * @param {module:api/ScoreApi~forkScoreCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreDetails}
     */
    this.forkScore = function(score, body, opts, callback) {
      opts = opts || {};
      var postBody = body;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling forkScore");
      }

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling forkScore");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
        'sharingKey': opts['sharingKey'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreDetails;

      return this.apiClient.callApi(
        '/scores/{score}/fork', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the gerUserLikes operation.
     * @callback module:api/ScoreApi~gerUserLikesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ScoreDetails>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List liked scores
     * @param {String} user Unique identifier of a Flat user. If you authenticated, you can use &#x60;me&#x60; to refer to the current user. 
     * @param {Object} opts Optional parameters
     * @param {Boolean} opts.ids Return only the identifiers of the scores
     * @param {module:api/ScoreApi~gerUserLikesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ScoreDetails>}
     */
    this.gerUserLikes = function(user, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling gerUserLikes");
      }


      var pathParams = {
        'user': user
      };
      var queryParams = {
        'ids': opts['ids'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ScoreDetails];

      return this.apiClient.callApi(
        '/users/{user}/likes', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getGroupScores operation.
     * @callback module:api/ScoreApi~getGroupScoresCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ScoreDetails>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List group&#39;s scores
     * Get the list of scores shared with a group. 
     * @param {String} group Unique identifier of a Flat group 
     * @param {Object} opts Optional parameters
     * @param {String} opts.parent Filter the score forked from the score id &#x60;parent&#x60;
     * @param {module:api/ScoreApi~getGroupScoresCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ScoreDetails>}
     */
    this.getGroupScores = function(group, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'group' is set
      if (group === undefined || group === null) {
        throw new Error("Missing the required parameter 'group' when calling getGroupScores");
      }


      var pathParams = {
        'group': group
      };
      var queryParams = {
        'parent': opts['parent'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ScoreDetails];

      return this.apiClient.callApi(
        '/groups/{group}/scores', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getScore operation.
     * @callback module:api/ScoreApi~getScoreCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get a score&#39;s metadata
     * Get the details of a score identified by the &#x60;score&#x60; parameter in the URL. The currently authenticated user must have at least a read access to the document to use this API call. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {Object} opts Optional parameters
     * @param {String} opts.sharingKey This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document. 
     * @param {module:api/ScoreApi~getScoreCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreDetails}
     */
    this.getScore = function(score, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling getScore");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
        'sharingKey': opts['sharingKey'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreDetails;

      return this.apiClient.callApi(
        '/scores/{score}', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getScoreCollaborator operation.
     * @callback module:api/ScoreApi~getScoreCollaboratorCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ResourceCollaborator} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get a collaborator
     * Get the information about a collaborator (User or Group). 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {String} collaborator Unique identifier of a **collaborator permission**, or unique identifier of a **User**, or unique identifier of a **Group** 
     * @param {Object} opts Optional parameters
     * @param {String} opts.sharingKey This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document. 
     * @param {module:api/ScoreApi~getScoreCollaboratorCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ResourceCollaborator}
     */
    this.getScoreCollaborator = function(score, collaborator, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling getScoreCollaborator");
      }

      // verify the required parameter 'collaborator' is set
      if (collaborator === undefined || collaborator === null) {
        throw new Error("Missing the required parameter 'collaborator' when calling getScoreCollaborator");
      }


      var pathParams = {
        'score': score,
        'collaborator': collaborator
      };
      var queryParams = {
        'sharingKey': opts['sharingKey'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ResourceCollaborator;

      return this.apiClient.callApi(
        '/scores/{score}/collaborators/{collaborator}', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getScoreCollaborators operation.
     * @callback module:api/ScoreApi~getScoreCollaboratorsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ResourceCollaborator>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List the collaborators
     * This API call will list the different collaborators of a score and their rights on the document. The returned list will at least contain the owner of the document.  Collaborators can be a single user (the object &#x60;user&#x60; will be populated) or a group (the object &#x60;group&#x60; will be populated). 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {Object} opts Optional parameters
     * @param {String} opts.sharingKey This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document. 
     * @param {module:api/ScoreApi~getScoreCollaboratorsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ResourceCollaborator>}
     */
    this.getScoreCollaborators = function(score, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling getScoreCollaborators");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
        'sharingKey': opts['sharingKey'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ResourceCollaborator];

      return this.apiClient.callApi(
        '/scores/{score}/collaborators', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getScoreComments operation.
     * @callback module:api/ScoreApi~getScoreCommentsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ScoreComment>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List comments
     * This method lists the different comments added on a music score (documents and inline) sorted by their post dates.
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {Object} opts Optional parameters
     * @param {String} opts.sharingKey This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document. 
     * @param {module:model/String} opts.type Filter the comments by type
     * @param {module:model/String} opts.sort Sort
     * @param {module:model/String} opts.direction Sort direction
     * @param {module:api/ScoreApi~getScoreCommentsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ScoreComment>}
     */
    this.getScoreComments = function(score, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling getScoreComments");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
        'sharingKey': opts['sharingKey'],
        'type': opts['type'],
        'sort': opts['sort'],
        'direction': opts['direction'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ScoreComment];

      return this.apiClient.callApi(
        '/scores/{score}/comments', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getScoreRevision operation.
     * @callback module:api/ScoreApi~getScoreRevisionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreRevision} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get a score revision
     * When creating a score or saving a new version of a score, a revision is created in our storage. This method allows you to get a specific revision metadata. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {String} revision Unique identifier of a score revision. You can use &#x60;last&#x60; to fetch the information related to the last version created. 
     * @param {Object} opts Optional parameters
     * @param {String} opts.sharingKey This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document. 
     * @param {module:api/ScoreApi~getScoreRevisionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreRevision}
     */
    this.getScoreRevision = function(score, revision, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling getScoreRevision");
      }

      // verify the required parameter 'revision' is set
      if (revision === undefined || revision === null) {
        throw new Error("Missing the required parameter 'revision' when calling getScoreRevision");
      }


      var pathParams = {
        'score': score,
        'revision': revision
      };
      var queryParams = {
        'sharingKey': opts['sharingKey'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreRevision;

      return this.apiClient.callApi(
        '/scores/{score}/revisions/{revision}', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getScoreRevisionData operation.
     * @callback module:api/ScoreApi~getScoreRevisionDataCallback
     * @param {String} error Error message, if any.
     * @param {'Blob'} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get a score revision data
     * Retrieve the file corresponding to a score revision (the following formats are available: Flat JSON/Adagio JSON &#x60;json&#x60;, MusicXML &#x60;mxl&#x60;/&#x60;xml&#x60;, MP3 &#x60;mp3&#x60;, WAV &#x60;wav&#x60;, MIDI &#x60;midi&#x60;, or a tumbnail of the first page &#x60;thumbnail.png&#x60;). 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {String} revision Unique identifier of a score revision. You can use &#x60;last&#x60; to fetch the information related to the last version created. 
     * @param {module:model/String} format The format of the file you will retrieve
     * @param {Object} opts Optional parameters
     * @param {String} opts.sharingKey This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document. 
     * @param {String} opts.parts An optional a set of parts to be exported. This parameter must be specified with a list of integers. For example \&quot;1,2,5\&quot;. 
     * @param {Boolean} opts.onlyCached Only return files already generated and cached in Flat&#39;s production cache. If the file is not availabe, a 404 will be returned 
     * @param {module:api/ScoreApi~getScoreRevisionDataCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link 'Blob'}
     */
    this.getScoreRevisionData = function(score, revision, format, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling getScoreRevisionData");
      }

      // verify the required parameter 'revision' is set
      if (revision === undefined || revision === null) {
        throw new Error("Missing the required parameter 'revision' when calling getScoreRevisionData");
      }

      // verify the required parameter 'format' is set
      if (format === undefined || format === null) {
        throw new Error("Missing the required parameter 'format' when calling getScoreRevisionData");
      }


      var pathParams = {
        'score': score,
        'revision': revision,
        'format': format
      };
      var queryParams = {
        'sharingKey': opts['sharingKey'],
        'parts': opts['parts'],
        'onlyCached': opts['onlyCached'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json', 'application/vnd.recordare.musicxml+xml', 'application/vnd.recordare.musicxml', 'audio/mp3', 'audio/wav', 'audio/midi', 'image/png'];
      var returnType = 'Blob';

      return this.apiClient.callApi(
        '/scores/{score}/revisions/{revision}/{format}', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getScoreRevisions operation.
     * @callback module:api/ScoreApi~getScoreRevisionsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ScoreRevision>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List the revisions
     * When creating a score or saving a new version of a score, a revision is created in our storage. This method allows you to list all of them, sorted by last modification.  Depending the plan of the account, this list can be trunked to the few last revisions. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {Object} opts Optional parameters
     * @param {String} opts.sharingKey This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document. 
     * @param {module:api/ScoreApi~getScoreRevisionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ScoreRevision>}
     */
    this.getScoreRevisions = function(score, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling getScoreRevisions");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
        'sharingKey': opts['sharingKey'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ScoreRevision];

      return this.apiClient.callApi(
        '/scores/{score}/revisions', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getScoreSubmissions operation.
     * @callback module:api/ScoreApi~getScoreSubmissionsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/AssignmentSubmission>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List submissions related to the score
     * This API call will list the different assignments submissions where the score is attached. This method can be used by anyone that are part of the organization and have at least read access to the document. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {module:api/ScoreApi~getScoreSubmissionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/AssignmentSubmission>}
     */
    this.getScoreSubmissions = function(score, callback) {
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling getScoreSubmissions");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [AssignmentSubmission];

      return this.apiClient.callApi(
        '/scores/{score}/submissions', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getScoreTrack operation.
     * @callback module:api/ScoreApi~getScoreTrackCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreTrack} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve the details of an audio or video track linked to a score
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {String} track Unique identifier of a score audio track 
     * @param {Object} opts Optional parameters
     * @param {String} opts.sharingKey This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document. 
     * @param {module:api/ScoreApi~getScoreTrackCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreTrack}
     */
    this.getScoreTrack = function(score, track, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling getScoreTrack");
      }

      // verify the required parameter 'track' is set
      if (track === undefined || track === null) {
        throw new Error("Missing the required parameter 'track' when calling getScoreTrack");
      }


      var pathParams = {
        'score': score,
        'track': track
      };
      var queryParams = {
        'sharingKey': opts['sharingKey'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreTrack;

      return this.apiClient.callApi(
        '/scores/{score}/tracks/{track}', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getUserScores operation.
     * @callback module:api/ScoreApi~getUserScoresCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ScoreDetails>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List user&#39;s scores
     * Get the list of public scores owned by a User.  **DEPRECATED**: Please note that the current behavior will be deprecrated on **2019-01-01**. This method will no longer list private and shared scores, but only public scores of a Flat account. If you want to access to private scores, please use the [Collections API](#tag/Collection) instead. 
     * @param {String} user Unique identifier of a Flat user. If you authenticated, you can use &#x60;me&#x60; to refer to the current user. 
     * @param {Object} opts Optional parameters
     * @param {String} opts.parent Filter the score forked from the score id &#x60;parent&#x60;
     * @param {module:api/ScoreApi~getUserScoresCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ScoreDetails>}
     */
    this.getUserScores = function(user, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling getUserScores");
      }


      var pathParams = {
        'user': user
      };
      var queryParams = {
        'parent': opts['parent'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ScoreDetails];

      return this.apiClient.callApi(
        '/users/{user}/scores', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the listScoreTracks operation.
     * @callback module:api/ScoreApi~listScoreTracksCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ScoreTrack>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List the audio or video tracks linked to a score
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {Object} opts Optional parameters
     * @param {String} opts.sharingKey This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document. 
     * @param {module:api/ScoreApi~listScoreTracksCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ScoreTrack>}
     */
    this.listScoreTracks = function(score, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling listScoreTracks");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
        'sharingKey': opts['sharingKey'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ScoreTrack];

      return this.apiClient.callApi(
        '/scores/{score}/tracks', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the markScoreCommentResolved operation.
     * @callback module:api/ScoreApi~markScoreCommentResolvedCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Mark the comment as resolved
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {String} comment Unique identifier of a sheet music comment 
     * @param {Object} opts Optional parameters
     * @param {String} opts.sharingKey This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document. 
     * @param {module:api/ScoreApi~markScoreCommentResolvedCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.markScoreCommentResolved = function(score, comment, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling markScoreCommentResolved");
      }

      // verify the required parameter 'comment' is set
      if (comment === undefined || comment === null) {
        throw new Error("Missing the required parameter 'comment' when calling markScoreCommentResolved");
      }


      var pathParams = {
        'score': score,
        'comment': comment
      };
      var queryParams = {
        'sharingKey': opts['sharingKey'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/scores/{score}/comments/{comment}/resolved', 'PUT',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the markScoreCommentUnresolved operation.
     * @callback module:api/ScoreApi~markScoreCommentUnresolvedCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Mark the comment as unresolved
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {String} comment Unique identifier of a sheet music comment 
     * @param {Object} opts Optional parameters
     * @param {String} opts.sharingKey This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document. 
     * @param {module:api/ScoreApi~markScoreCommentUnresolvedCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.markScoreCommentUnresolved = function(score, comment, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling markScoreCommentUnresolved");
      }

      // verify the required parameter 'comment' is set
      if (comment === undefined || comment === null) {
        throw new Error("Missing the required parameter 'comment' when calling markScoreCommentUnresolved");
      }


      var pathParams = {
        'score': score,
        'comment': comment
      };
      var queryParams = {
        'sharingKey': opts['sharingKey'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/scores/{score}/comments/{comment}/resolved', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postScoreComment operation.
     * @callback module:api/ScoreApi~postScoreCommentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreComment} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Post a new comment
     * Post a document or a contextualized comment on a document.  Please note that this method includes an anti-spam system for public scores. We don&#39;t guarantee that your comments will be accepted and displayed to end-user. Comments are be blocked by returning a &#x60;403&#x60; HTTP error and hidden from other users when the &#x60;spam&#x60; property is &#x60;true&#x60;. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {module:model/ScoreCommentCreation} body 
     * @param {Object} opts Optional parameters
     * @param {String} opts.sharingKey This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document. 
     * @param {module:api/ScoreApi~postScoreCommentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreComment}
     */
    this.postScoreComment = function(score, body, opts, callback) {
      opts = opts || {};
      var postBody = body;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling postScoreComment");
      }

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling postScoreComment");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
        'sharingKey': opts['sharingKey'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreComment;

      return this.apiClient.callApi(
        '/scores/{score}/comments', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the removeScoreCollaborator operation.
     * @callback module:api/ScoreApi~removeScoreCollaboratorCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a collaborator
     * Remove the specified collaborator from the score 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {String} collaborator Unique identifier of a **collaborator permission**, or unique identifier of a **User**, or unique identifier of a **Group** 
     * @param {module:api/ScoreApi~removeScoreCollaboratorCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.removeScoreCollaborator = function(score, collaborator, callback) {
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling removeScoreCollaborator");
      }

      // verify the required parameter 'collaborator' is set
      if (collaborator === undefined || collaborator === null) {
        throw new Error("Missing the required parameter 'collaborator' when calling removeScoreCollaborator");
      }


      var pathParams = {
        'score': score,
        'collaborator': collaborator
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/scores/{score}/collaborators/{collaborator}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the untrashScore operation.
     * @callback module:api/ScoreApi~untrashScoreCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Untrash a score
     * This method will remove the score from the &#x60;trash&#x60; collection and from the deletion queue, and add it back to the original collections. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {module:api/ScoreApi~untrashScoreCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.untrashScore = function(score, callback) {
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling untrashScore");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/scores/{score}/untrash', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the updateScoreComment operation.
     * @callback module:api/ScoreApi~updateScoreCommentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreComment} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update an existing comment
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {String} comment Unique identifier of a sheet music comment 
     * @param {module:model/ScoreCommentUpdate} body 
     * @param {Object} opts Optional parameters
     * @param {String} opts.sharingKey This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document. 
     * @param {module:api/ScoreApi~updateScoreCommentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreComment}
     */
    this.updateScoreComment = function(score, comment, body, opts, callback) {
      opts = opts || {};
      var postBody = body;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling updateScoreComment");
      }

      // verify the required parameter 'comment' is set
      if (comment === undefined || comment === null) {
        throw new Error("Missing the required parameter 'comment' when calling updateScoreComment");
      }

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling updateScoreComment");
      }


      var pathParams = {
        'score': score,
        'comment': comment
      };
      var queryParams = {
        'sharingKey': opts['sharingKey'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreComment;

      return this.apiClient.callApi(
        '/scores/{score}/comments/{comment}', 'PUT',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the updateScoreTrack operation.
     * @callback module:api/ScoreApi~updateScoreTrackCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreTrack} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update an audio or video track linked to a score
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {String} track Unique identifier of a score audio track 
     * @param {module:model/ScoreTrackUpdate} body 
     * @param {module:api/ScoreApi~updateScoreTrackCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreTrack}
     */
    this.updateScoreTrack = function(score, track, body, callback) {
      var postBody = body;

      // verify the required parameter 'score' is set
      if (score === undefined || score === null) {
        throw new Error("Missing the required parameter 'score' when calling updateScoreTrack");
      }

      // verify the required parameter 'track' is set
      if (track === undefined || track === null) {
        throw new Error("Missing the required parameter 'track' when calling updateScoreTrack");
      }

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling updateScoreTrack");
      }


      var pathParams = {
        'score': score,
        'track': track
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreTrack;

      return this.apiClient.callApi(
        '/scores/{score}/tracks/{track}', 'PUT',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));

},{"../ApiClient":16,"../model/AssignmentSubmission":28,"../model/FlatErrorResponse":48,"../model/ResourceCollaborator":65,"../model/ResourceCollaboratorCreation":66,"../model/ScoreComment":69,"../model/ScoreCommentCreation":71,"../model/ScoreCommentUpdate":72,"../model/ScoreCreation":74,"../model/ScoreDetails":78,"../model/ScoreFork":79,"../model/ScoreModification":82,"../model/ScoreRevision":84,"../model/ScoreRevisionCreation":85,"../model/ScoreTrack":89,"../model/ScoreTrackCreation":90,"../model/ScoreTrackUpdate":94}],23:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/FlatErrorResponse', 'model/ScoreDetails', 'model/UserPublic'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/FlatErrorResponse'), require('../model/ScoreDetails'), require('../model/UserPublic'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.UserApi = factory(root.FlatApi.ApiClient, root.FlatApi.FlatErrorResponse, root.FlatApi.ScoreDetails, root.FlatApi.UserPublic);
  }
}(this, function(ApiClient, FlatErrorResponse, ScoreDetails, UserPublic) {
  'use strict';

  /**
   * User service.
   * @module api/UserApi
   * @version 2.6.0
   */

  /**
   * Constructs a new UserApi. 
   * @alias module:api/UserApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the gerUserLikes operation.
     * @callback module:api/UserApi~gerUserLikesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ScoreDetails>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List liked scores
     * @param {String} user Unique identifier of a Flat user. If you authenticated, you can use &#x60;me&#x60; to refer to the current user. 
     * @param {Object} opts Optional parameters
     * @param {Boolean} opts.ids Return only the identifiers of the scores
     * @param {module:api/UserApi~gerUserLikesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ScoreDetails>}
     */
    this.gerUserLikes = function(user, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling gerUserLikes");
      }


      var pathParams = {
        'user': user
      };
      var queryParams = {
        'ids': opts['ids'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ScoreDetails];

      return this.apiClient.callApi(
        '/users/{user}/likes', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getUser operation.
     * @callback module:api/UserApi~getUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UserPublic} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get a public user profile
     * Get a public profile of a Flat User. 
     * @param {String} user This route parameter is the unique identifier of the user. You can specify an email instead of an unique identifier. If you are executing this request authenticated, you can use &#x60;me&#x60; as a value instead of the current User unique identifier to work on the current authenticated user. 
     * @param {module:api/UserApi~getUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UserPublic}
     */
    this.getUser = function(user, callback) {
      var postBody = null;

      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling getUser");
      }


      var pathParams = {
        'user': user
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = UserPublic;

      return this.apiClient.callApi(
        '/users/{user}', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getUserScores operation.
     * @callback module:api/UserApi~getUserScoresCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ScoreDetails>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List user&#39;s scores
     * Get the list of public scores owned by a User.  **DEPRECATED**: Please note that the current behavior will be deprecrated on **2019-01-01**. This method will no longer list private and shared scores, but only public scores of a Flat account. If you want to access to private scores, please use the [Collections API](#tag/Collection) instead. 
     * @param {String} user Unique identifier of a Flat user. If you authenticated, you can use &#x60;me&#x60; to refer to the current user. 
     * @param {Object} opts Optional parameters
     * @param {String} opts.parent Filter the score forked from the score id &#x60;parent&#x60;
     * @param {module:api/UserApi~getUserScoresCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ScoreDetails>}
     */
    this.getUserScores = function(user, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling getUserScores");
      }


      var pathParams = {
        'user': user
      };
      var queryParams = {
        'parent': opts['parent'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ScoreDetails];

      return this.apiClient.callApi(
        '/users/{user}/scores', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));

},{"../ApiClient":16,"../model/FlatErrorResponse":48,"../model/ScoreDetails":78,"../model/UserPublic":103}],24:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Assignment', 'model/AssignmentCopy', 'model/AssignmentCreation', 'model/AssignmentSubmission', 'model/AssignmentSubmissionUpdate', 'model/ClassAttachmentCreation', 'model/ClassCreation', 'model/ClassDetails', 'model/ClassDetailsCanvas', 'model/ClassDetailsClever', 'model/ClassDetailsGoogleClassroom', 'model/ClassDetailsGoogleDrive', 'model/ClassDetailsLti', 'model/ClassRoles', 'model/ClassState', 'model/ClassUpdate', 'model/Collection', 'model/CollectionCapabilities', 'model/CollectionCreation', 'model/CollectionModification', 'model/CollectionPrivacy', 'model/CollectionTitle', 'model/CollectionType', 'model/FlatErrorResponse', 'model/FlatLocales', 'model/GoogleClassroomCoursework', 'model/GoogleClassroomSubmission', 'model/Group', 'model/GroupDetails', 'model/GroupType', 'model/LicenseMode', 'model/LicenseSources', 'model/LmsName', 'model/LtiCredentials', 'model/LtiCredentialsCreation', 'model/MediaAttachment', 'model/MediaScoreSharingMode', 'model/OrganizationInvitation', 'model/OrganizationInvitationCreation', 'model/OrganizationRoles', 'model/ResourceCollaboratorCreation', 'model/ResourceRights', 'model/ResourceSharingKey', 'model/ScoreComment', 'model/ScoreCommentContext', 'model/ScoreCommentCreation', 'model/ScoreCommentUpdate', 'model/ScoreCommentsCounts', 'model/ScoreCreation', 'model/ScoreCreationType', 'model/ScoreData', 'model/ScoreDataEncoding', 'model/ScoreFork', 'model/ScoreLicense', 'model/ScoreLikesCounts', 'model/ScoreModification', 'model/ScorePrivacy', 'model/ScoreRevision', 'model/ScoreRevisionCreation', 'model/ScoreRevisionStatistics', 'model/ScoreSource', 'model/ScoreSummary', 'model/ScoreTrack', 'model/ScoreTrackCreation', 'model/ScoreTrackPoint', 'model/ScoreTrackState', 'model/ScoreTrackType', 'model/ScoreTrackUpdate', 'model/ScoreViewsCounts', 'model/UserAdminUpdate', 'model/UserBasics', 'model/UserCreation', 'model/UserDetailsAdminLicense', 'model/UserInstruments', 'model/ResourceCollaborator', 'model/ScoreDetails', 'model/UserPublicSummary', 'model/UserDetailsAdmin', 'model/UserPublic', 'model/UserDetails', 'api/AccountApi', 'api/ClassApi', 'api/CollectionApi', 'api/GroupApi', 'api/OrganizationApi', 'api/ScoreApi', 'api/UserApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/Assignment'), require('./model/AssignmentCopy'), require('./model/AssignmentCreation'), require('./model/AssignmentSubmission'), require('./model/AssignmentSubmissionUpdate'), require('./model/ClassAttachmentCreation'), require('./model/ClassCreation'), require('./model/ClassDetails'), require('./model/ClassDetailsCanvas'), require('./model/ClassDetailsClever'), require('./model/ClassDetailsGoogleClassroom'), require('./model/ClassDetailsGoogleDrive'), require('./model/ClassDetailsLti'), require('./model/ClassRoles'), require('./model/ClassState'), require('./model/ClassUpdate'), require('./model/Collection'), require('./model/CollectionCapabilities'), require('./model/CollectionCreation'), require('./model/CollectionModification'), require('./model/CollectionPrivacy'), require('./model/CollectionTitle'), require('./model/CollectionType'), require('./model/FlatErrorResponse'), require('./model/FlatLocales'), require('./model/GoogleClassroomCoursework'), require('./model/GoogleClassroomSubmission'), require('./model/Group'), require('./model/GroupDetails'), require('./model/GroupType'), require('./model/LicenseMode'), require('./model/LicenseSources'), require('./model/LmsName'), require('./model/LtiCredentials'), require('./model/LtiCredentialsCreation'), require('./model/MediaAttachment'), require('./model/MediaScoreSharingMode'), require('./model/OrganizationInvitation'), require('./model/OrganizationInvitationCreation'), require('./model/OrganizationRoles'), require('./model/ResourceCollaboratorCreation'), require('./model/ResourceRights'), require('./model/ResourceSharingKey'), require('./model/ScoreComment'), require('./model/ScoreCommentContext'), require('./model/ScoreCommentCreation'), require('./model/ScoreCommentUpdate'), require('./model/ScoreCommentsCounts'), require('./model/ScoreCreation'), require('./model/ScoreCreationType'), require('./model/ScoreData'), require('./model/ScoreDataEncoding'), require('./model/ScoreFork'), require('./model/ScoreLicense'), require('./model/ScoreLikesCounts'), require('./model/ScoreModification'), require('./model/ScorePrivacy'), require('./model/ScoreRevision'), require('./model/ScoreRevisionCreation'), require('./model/ScoreRevisionStatistics'), require('./model/ScoreSource'), require('./model/ScoreSummary'), require('./model/ScoreTrack'), require('./model/ScoreTrackCreation'), require('./model/ScoreTrackPoint'), require('./model/ScoreTrackState'), require('./model/ScoreTrackType'), require('./model/ScoreTrackUpdate'), require('./model/ScoreViewsCounts'), require('./model/UserAdminUpdate'), require('./model/UserBasics'), require('./model/UserCreation'), require('./model/UserDetailsAdminLicense'), require('./model/UserInstruments'), require('./model/ResourceCollaborator'), require('./model/ScoreDetails'), require('./model/UserPublicSummary'), require('./model/UserDetailsAdmin'), require('./model/UserPublic'), require('./model/UserDetails'), require('./api/AccountApi'), require('./api/ClassApi'), require('./api/CollectionApi'), require('./api/GroupApi'), require('./api/OrganizationApi'), require('./api/ScoreApi'), require('./api/UserApi'));
  }
}(function(ApiClient, Assignment, AssignmentCopy, AssignmentCreation, AssignmentSubmission, AssignmentSubmissionUpdate, ClassAttachmentCreation, ClassCreation, ClassDetails, ClassDetailsCanvas, ClassDetailsClever, ClassDetailsGoogleClassroom, ClassDetailsGoogleDrive, ClassDetailsLti, ClassRoles, ClassState, ClassUpdate, Collection, CollectionCapabilities, CollectionCreation, CollectionModification, CollectionPrivacy, CollectionTitle, CollectionType, FlatErrorResponse, FlatLocales, GoogleClassroomCoursework, GoogleClassroomSubmission, Group, GroupDetails, GroupType, LicenseMode, LicenseSources, LmsName, LtiCredentials, LtiCredentialsCreation, MediaAttachment, MediaScoreSharingMode, OrganizationInvitation, OrganizationInvitationCreation, OrganizationRoles, ResourceCollaboratorCreation, ResourceRights, ResourceSharingKey, ScoreComment, ScoreCommentContext, ScoreCommentCreation, ScoreCommentUpdate, ScoreCommentsCounts, ScoreCreation, ScoreCreationType, ScoreData, ScoreDataEncoding, ScoreFork, ScoreLicense, ScoreLikesCounts, ScoreModification, ScorePrivacy, ScoreRevision, ScoreRevisionCreation, ScoreRevisionStatistics, ScoreSource, ScoreSummary, ScoreTrack, ScoreTrackCreation, ScoreTrackPoint, ScoreTrackState, ScoreTrackType, ScoreTrackUpdate, ScoreViewsCounts, UserAdminUpdate, UserBasics, UserCreation, UserDetailsAdminLicense, UserInstruments, ResourceCollaborator, ScoreDetails, UserPublicSummary, UserDetailsAdmin, UserPublic, UserDetails, AccountApi, ClassApi, CollectionApi, GroupApi, OrganizationApi, ScoreApi, UserApi) {
  'use strict';

  /**
   * JavaScript Client for Flat REST API (https://flat.io).<br>
   * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
   * <p>
   * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
   * <pre>
   * var FlatApi = require('index'); // See note below*.
   * var xxxSvc = new FlatApi.XxxApi(); // Allocate the API class we're going to use.
   * var yyyModel = new FlatApi.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
   * and put the application logic within the callback function.</em>
   * </p>
   * <p>
   * A non-AMD browser application (discouraged) might do something like this:
   * <pre>
   * var xxxSvc = new FlatApi.XxxApi(); // Allocate the API class we're going to use.
   * var yyy = new FlatApi.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * </p>
   * @module index
   * @version 2.6.0
   */
  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The Assignment model constructor.
     * @property {module:model/Assignment}
     */
    Assignment: Assignment,
    /**
     * The AssignmentCopy model constructor.
     * @property {module:model/AssignmentCopy}
     */
    AssignmentCopy: AssignmentCopy,
    /**
     * The AssignmentCreation model constructor.
     * @property {module:model/AssignmentCreation}
     */
    AssignmentCreation: AssignmentCreation,
    /**
     * The AssignmentSubmission model constructor.
     * @property {module:model/AssignmentSubmission}
     */
    AssignmentSubmission: AssignmentSubmission,
    /**
     * The AssignmentSubmissionUpdate model constructor.
     * @property {module:model/AssignmentSubmissionUpdate}
     */
    AssignmentSubmissionUpdate: AssignmentSubmissionUpdate,
    /**
     * The ClassAttachmentCreation model constructor.
     * @property {module:model/ClassAttachmentCreation}
     */
    ClassAttachmentCreation: ClassAttachmentCreation,
    /**
     * The ClassCreation model constructor.
     * @property {module:model/ClassCreation}
     */
    ClassCreation: ClassCreation,
    /**
     * The ClassDetails model constructor.
     * @property {module:model/ClassDetails}
     */
    ClassDetails: ClassDetails,
    /**
     * The ClassDetailsCanvas model constructor.
     * @property {module:model/ClassDetailsCanvas}
     */
    ClassDetailsCanvas: ClassDetailsCanvas,
    /**
     * The ClassDetailsClever model constructor.
     * @property {module:model/ClassDetailsClever}
     */
    ClassDetailsClever: ClassDetailsClever,
    /**
     * The ClassDetailsGoogleClassroom model constructor.
     * @property {module:model/ClassDetailsGoogleClassroom}
     */
    ClassDetailsGoogleClassroom: ClassDetailsGoogleClassroom,
    /**
     * The ClassDetailsGoogleDrive model constructor.
     * @property {module:model/ClassDetailsGoogleDrive}
     */
    ClassDetailsGoogleDrive: ClassDetailsGoogleDrive,
    /**
     * The ClassDetailsLti model constructor.
     * @property {module:model/ClassDetailsLti}
     */
    ClassDetailsLti: ClassDetailsLti,
    /**
     * The ClassRoles model constructor.
     * @property {module:model/ClassRoles}
     */
    ClassRoles: ClassRoles,
    /**
     * The ClassState model constructor.
     * @property {module:model/ClassState}
     */
    ClassState: ClassState,
    /**
     * The ClassUpdate model constructor.
     * @property {module:model/ClassUpdate}
     */
    ClassUpdate: ClassUpdate,
    /**
     * The Collection model constructor.
     * @property {module:model/Collection}
     */
    Collection: Collection,
    /**
     * The CollectionCapabilities model constructor.
     * @property {module:model/CollectionCapabilities}
     */
    CollectionCapabilities: CollectionCapabilities,
    /**
     * The CollectionCreation model constructor.
     * @property {module:model/CollectionCreation}
     */
    CollectionCreation: CollectionCreation,
    /**
     * The CollectionModification model constructor.
     * @property {module:model/CollectionModification}
     */
    CollectionModification: CollectionModification,
    /**
     * The CollectionPrivacy model constructor.
     * @property {module:model/CollectionPrivacy}
     */
    CollectionPrivacy: CollectionPrivacy,
    /**
     * The CollectionTitle model constructor.
     * @property {module:model/CollectionTitle}
     */
    CollectionTitle: CollectionTitle,
    /**
     * The CollectionType model constructor.
     * @property {module:model/CollectionType}
     */
    CollectionType: CollectionType,
    /**
     * The FlatErrorResponse model constructor.
     * @property {module:model/FlatErrorResponse}
     */
    FlatErrorResponse: FlatErrorResponse,
    /**
     * The FlatLocales model constructor.
     * @property {module:model/FlatLocales}
     */
    FlatLocales: FlatLocales,
    /**
     * The GoogleClassroomCoursework model constructor.
     * @property {module:model/GoogleClassroomCoursework}
     */
    GoogleClassroomCoursework: GoogleClassroomCoursework,
    /**
     * The GoogleClassroomSubmission model constructor.
     * @property {module:model/GoogleClassroomSubmission}
     */
    GoogleClassroomSubmission: GoogleClassroomSubmission,
    /**
     * The Group model constructor.
     * @property {module:model/Group}
     */
    Group: Group,
    /**
     * The GroupDetails model constructor.
     * @property {module:model/GroupDetails}
     */
    GroupDetails: GroupDetails,
    /**
     * The GroupType model constructor.
     * @property {module:model/GroupType}
     */
    GroupType: GroupType,
    /**
     * The LicenseMode model constructor.
     * @property {module:model/LicenseMode}
     */
    LicenseMode: LicenseMode,
    /**
     * The LicenseSources model constructor.
     * @property {module:model/LicenseSources}
     */
    LicenseSources: LicenseSources,
    /**
     * The LmsName model constructor.
     * @property {module:model/LmsName}
     */
    LmsName: LmsName,
    /**
     * The LtiCredentials model constructor.
     * @property {module:model/LtiCredentials}
     */
    LtiCredentials: LtiCredentials,
    /**
     * The LtiCredentialsCreation model constructor.
     * @property {module:model/LtiCredentialsCreation}
     */
    LtiCredentialsCreation: LtiCredentialsCreation,
    /**
     * The MediaAttachment model constructor.
     * @property {module:model/MediaAttachment}
     */
    MediaAttachment: MediaAttachment,
    /**
     * The MediaScoreSharingMode model constructor.
     * @property {module:model/MediaScoreSharingMode}
     */
    MediaScoreSharingMode: MediaScoreSharingMode,
    /**
     * The OrganizationInvitation model constructor.
     * @property {module:model/OrganizationInvitation}
     */
    OrganizationInvitation: OrganizationInvitation,
    /**
     * The OrganizationInvitationCreation model constructor.
     * @property {module:model/OrganizationInvitationCreation}
     */
    OrganizationInvitationCreation: OrganizationInvitationCreation,
    /**
     * The OrganizationRoles model constructor.
     * @property {module:model/OrganizationRoles}
     */
    OrganizationRoles: OrganizationRoles,
    /**
     * The ResourceCollaboratorCreation model constructor.
     * @property {module:model/ResourceCollaboratorCreation}
     */
    ResourceCollaboratorCreation: ResourceCollaboratorCreation,
    /**
     * The ResourceRights model constructor.
     * @property {module:model/ResourceRights}
     */
    ResourceRights: ResourceRights,
    /**
     * The ResourceSharingKey model constructor.
     * @property {module:model/ResourceSharingKey}
     */
    ResourceSharingKey: ResourceSharingKey,
    /**
     * The ScoreComment model constructor.
     * @property {module:model/ScoreComment}
     */
    ScoreComment: ScoreComment,
    /**
     * The ScoreCommentContext model constructor.
     * @property {module:model/ScoreCommentContext}
     */
    ScoreCommentContext: ScoreCommentContext,
    /**
     * The ScoreCommentCreation model constructor.
     * @property {module:model/ScoreCommentCreation}
     */
    ScoreCommentCreation: ScoreCommentCreation,
    /**
     * The ScoreCommentUpdate model constructor.
     * @property {module:model/ScoreCommentUpdate}
     */
    ScoreCommentUpdate: ScoreCommentUpdate,
    /**
     * The ScoreCommentsCounts model constructor.
     * @property {module:model/ScoreCommentsCounts}
     */
    ScoreCommentsCounts: ScoreCommentsCounts,
    /**
     * The ScoreCreation model constructor.
     * @property {module:model/ScoreCreation}
     */
    ScoreCreation: ScoreCreation,
    /**
     * The ScoreCreationType model constructor.
     * @property {module:model/ScoreCreationType}
     */
    ScoreCreationType: ScoreCreationType,
    /**
     * The ScoreData model constructor.
     * @property {module:model/ScoreData}
     */
    ScoreData: ScoreData,
    /**
     * The ScoreDataEncoding model constructor.
     * @property {module:model/ScoreDataEncoding}
     */
    ScoreDataEncoding: ScoreDataEncoding,
    /**
     * The ScoreFork model constructor.
     * @property {module:model/ScoreFork}
     */
    ScoreFork: ScoreFork,
    /**
     * The ScoreLicense model constructor.
     * @property {module:model/ScoreLicense}
     */
    ScoreLicense: ScoreLicense,
    /**
     * The ScoreLikesCounts model constructor.
     * @property {module:model/ScoreLikesCounts}
     */
    ScoreLikesCounts: ScoreLikesCounts,
    /**
     * The ScoreModification model constructor.
     * @property {module:model/ScoreModification}
     */
    ScoreModification: ScoreModification,
    /**
     * The ScorePrivacy model constructor.
     * @property {module:model/ScorePrivacy}
     */
    ScorePrivacy: ScorePrivacy,
    /**
     * The ScoreRevision model constructor.
     * @property {module:model/ScoreRevision}
     */
    ScoreRevision: ScoreRevision,
    /**
     * The ScoreRevisionCreation model constructor.
     * @property {module:model/ScoreRevisionCreation}
     */
    ScoreRevisionCreation: ScoreRevisionCreation,
    /**
     * The ScoreRevisionStatistics model constructor.
     * @property {module:model/ScoreRevisionStatistics}
     */
    ScoreRevisionStatistics: ScoreRevisionStatistics,
    /**
     * The ScoreSource model constructor.
     * @property {module:model/ScoreSource}
     */
    ScoreSource: ScoreSource,
    /**
     * The ScoreSummary model constructor.
     * @property {module:model/ScoreSummary}
     */
    ScoreSummary: ScoreSummary,
    /**
     * The ScoreTrack model constructor.
     * @property {module:model/ScoreTrack}
     */
    ScoreTrack: ScoreTrack,
    /**
     * The ScoreTrackCreation model constructor.
     * @property {module:model/ScoreTrackCreation}
     */
    ScoreTrackCreation: ScoreTrackCreation,
    /**
     * The ScoreTrackPoint model constructor.
     * @property {module:model/ScoreTrackPoint}
     */
    ScoreTrackPoint: ScoreTrackPoint,
    /**
     * The ScoreTrackState model constructor.
     * @property {module:model/ScoreTrackState}
     */
    ScoreTrackState: ScoreTrackState,
    /**
     * The ScoreTrackType model constructor.
     * @property {module:model/ScoreTrackType}
     */
    ScoreTrackType: ScoreTrackType,
    /**
     * The ScoreTrackUpdate model constructor.
     * @property {module:model/ScoreTrackUpdate}
     */
    ScoreTrackUpdate: ScoreTrackUpdate,
    /**
     * The ScoreViewsCounts model constructor.
     * @property {module:model/ScoreViewsCounts}
     */
    ScoreViewsCounts: ScoreViewsCounts,
    /**
     * The UserAdminUpdate model constructor.
     * @property {module:model/UserAdminUpdate}
     */
    UserAdminUpdate: UserAdminUpdate,
    /**
     * The UserBasics model constructor.
     * @property {module:model/UserBasics}
     */
    UserBasics: UserBasics,
    /**
     * The UserCreation model constructor.
     * @property {module:model/UserCreation}
     */
    UserCreation: UserCreation,
    /**
     * The UserDetailsAdminLicense model constructor.
     * @property {module:model/UserDetailsAdminLicense}
     */
    UserDetailsAdminLicense: UserDetailsAdminLicense,
    /**
     * The UserInstruments model constructor.
     * @property {module:model/UserInstruments}
     */
    UserInstruments: UserInstruments,
    /**
     * The ResourceCollaborator model constructor.
     * @property {module:model/ResourceCollaborator}
     */
    ResourceCollaborator: ResourceCollaborator,
    /**
     * The ScoreDetails model constructor.
     * @property {module:model/ScoreDetails}
     */
    ScoreDetails: ScoreDetails,
    /**
     * The UserPublicSummary model constructor.
     * @property {module:model/UserPublicSummary}
     */
    UserPublicSummary: UserPublicSummary,
    /**
     * The UserDetailsAdmin model constructor.
     * @property {module:model/UserDetailsAdmin}
     */
    UserDetailsAdmin: UserDetailsAdmin,
    /**
     * The UserPublic model constructor.
     * @property {module:model/UserPublic}
     */
    UserPublic: UserPublic,
    /**
     * The UserDetails model constructor.
     * @property {module:model/UserDetails}
     */
    UserDetails: UserDetails,
    /**
     * The AccountApi service constructor.
     * @property {module:api/AccountApi}
     */
    AccountApi: AccountApi,
    /**
     * The ClassApi service constructor.
     * @property {module:api/ClassApi}
     */
    ClassApi: ClassApi,
    /**
     * The CollectionApi service constructor.
     * @property {module:api/CollectionApi}
     */
    CollectionApi: CollectionApi,
    /**
     * The GroupApi service constructor.
     * @property {module:api/GroupApi}
     */
    GroupApi: GroupApi,
    /**
     * The OrganizationApi service constructor.
     * @property {module:api/OrganizationApi}
     */
    OrganizationApi: OrganizationApi,
    /**
     * The ScoreApi service constructor.
     * @property {module:api/ScoreApi}
     */
    ScoreApi: ScoreApi,
    /**
     * The UserApi service constructor.
     * @property {module:api/UserApi}
     */
    UserApi: UserApi
  };

  return exports;
}));

},{"./ApiClient":16,"./api/AccountApi":17,"./api/ClassApi":18,"./api/CollectionApi":19,"./api/GroupApi":20,"./api/OrganizationApi":21,"./api/ScoreApi":22,"./api/UserApi":23,"./model/Assignment":25,"./model/AssignmentCopy":26,"./model/AssignmentCreation":27,"./model/AssignmentSubmission":28,"./model/AssignmentSubmissionUpdate":29,"./model/ClassAttachmentCreation":30,"./model/ClassCreation":31,"./model/ClassDetails":32,"./model/ClassDetailsCanvas":33,"./model/ClassDetailsClever":34,"./model/ClassDetailsGoogleClassroom":35,"./model/ClassDetailsGoogleDrive":36,"./model/ClassDetailsLti":37,"./model/ClassRoles":38,"./model/ClassState":39,"./model/ClassUpdate":40,"./model/Collection":41,"./model/CollectionCapabilities":42,"./model/CollectionCreation":43,"./model/CollectionModification":44,"./model/CollectionPrivacy":45,"./model/CollectionTitle":46,"./model/CollectionType":47,"./model/FlatErrorResponse":48,"./model/FlatLocales":49,"./model/GoogleClassroomCoursework":50,"./model/GoogleClassroomSubmission":51,"./model/Group":52,"./model/GroupDetails":53,"./model/GroupType":54,"./model/LicenseMode":55,"./model/LicenseSources":56,"./model/LmsName":57,"./model/LtiCredentials":58,"./model/LtiCredentialsCreation":59,"./model/MediaAttachment":60,"./model/MediaScoreSharingMode":61,"./model/OrganizationInvitation":62,"./model/OrganizationInvitationCreation":63,"./model/OrganizationRoles":64,"./model/ResourceCollaborator":65,"./model/ResourceCollaboratorCreation":66,"./model/ResourceRights":67,"./model/ResourceSharingKey":68,"./model/ScoreComment":69,"./model/ScoreCommentContext":70,"./model/ScoreCommentCreation":71,"./model/ScoreCommentUpdate":72,"./model/ScoreCommentsCounts":73,"./model/ScoreCreation":74,"./model/ScoreCreationType":75,"./model/ScoreData":76,"./model/ScoreDataEncoding":77,"./model/ScoreDetails":78,"./model/ScoreFork":79,"./model/ScoreLicense":80,"./model/ScoreLikesCounts":81,"./model/ScoreModification":82,"./model/ScorePrivacy":83,"./model/ScoreRevision":84,"./model/ScoreRevisionCreation":85,"./model/ScoreRevisionStatistics":86,"./model/ScoreSource":87,"./model/ScoreSummary":88,"./model/ScoreTrack":89,"./model/ScoreTrackCreation":90,"./model/ScoreTrackPoint":91,"./model/ScoreTrackState":92,"./model/ScoreTrackType":93,"./model/ScoreTrackUpdate":94,"./model/ScoreViewsCounts":95,"./model/UserAdminUpdate":96,"./model/UserBasics":97,"./model/UserCreation":98,"./model/UserDetails":99,"./model/UserDetailsAdmin":100,"./model/UserDetailsAdminLicense":101,"./model/UserInstruments":102,"./model/UserPublic":103,"./model/UserPublicSummary":104}],25:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/AssignmentSubmission', 'model/GoogleClassroomCoursework', 'model/MediaAttachment'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./AssignmentSubmission'), require('./GoogleClassroomCoursework'), require('./MediaAttachment'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.Assignment = factory(root.FlatApi.ApiClient, root.FlatApi.AssignmentSubmission, root.FlatApi.GoogleClassroomCoursework, root.FlatApi.MediaAttachment);
  }
}(this, function(ApiClient, AssignmentSubmission, GoogleClassroomCoursework, MediaAttachment) {
  'use strict';




  /**
   * The Assignment model module.
   * @module model/Assignment
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>Assignment</code>.
   * Assignment details
   * @alias module:model/Assignment
   * @class
   */
  var exports = function() {
    var _this = this;












  };

  /**
   * Constructs a <code>Assignment</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Assignment} obj Optional instance to populate.
   * @return {module:model/Assignment} The populated <code>Assignment</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('state')) {
        obj['state'] = ApiClient.convertToType(data['state'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('classroom')) {
        obj['classroom'] = ApiClient.convertToType(data['classroom'], 'String');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('attachments')) {
        obj['attachments'] = ApiClient.convertToType(data['attachments'], [MediaAttachment]);
      }
      if (data.hasOwnProperty('submissions')) {
        obj['submissions'] = ApiClient.convertToType(data['submissions'], [AssignmentSubmission]);
      }
      if (data.hasOwnProperty('creator')) {
        obj['creator'] = ApiClient.convertToType(data['creator'], 'String');
      }
      if (data.hasOwnProperty('creationDate')) {
        obj['creationDate'] = ApiClient.convertToType(data['creationDate'], 'Date');
      }
      if (data.hasOwnProperty('scheduledDate')) {
        obj['scheduledDate'] = ApiClient.convertToType(data['scheduledDate'], 'Date');
      }
      if (data.hasOwnProperty('dueDate')) {
        obj['dueDate'] = ApiClient.convertToType(data['dueDate'], 'Date');
      }
      if (data.hasOwnProperty('googleClassroom')) {
        obj['googleClassroom'] = GoogleClassroomCoursework.constructFromObject(data['googleClassroom']);
      }
    }
    return obj;
  }

  /**
   * State of the assignment
   * @member {module:model/Assignment.StateEnum} state
   */
  exports.prototype['state'] = undefined;
  /**
   * Title of the assignment
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * The unique identifier of the class where this assignment was posted
   * @member {String} classroom
   */
  exports.prototype['classroom'] = undefined;
  /**
   * Description and content of the assignment
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * @member {Array.<module:model/MediaAttachment>} attachments
   */
  exports.prototype['attachments'] = undefined;
  /**
   * @member {Array.<module:model/AssignmentSubmission>} submissions
   */
  exports.prototype['submissions'] = undefined;
  /**
   * The User unique identifier of the creator of this assignment 
   * @member {String} creator
   */
  exports.prototype['creator'] = undefined;
  /**
   * The creation date of this assignment
   * @member {Date} creationDate
   */
  exports.prototype['creationDate'] = undefined;
  /**
   * The publication (scheduled) date of the assignment. If this one is specified, the assignment will only be listed to the teachers of the class. 
   * @member {Date} scheduledDate
   */
  exports.prototype['scheduledDate'] = undefined;
  /**
   * The due date of this assignment, late submissions will be marked as paste due. 
   * @member {Date} dueDate
   */
  exports.prototype['dueDate'] = undefined;
  /**
   * @member {module:model/GoogleClassroomCoursework} googleClassroom
   */
  exports.prototype['googleClassroom'] = undefined;


  /**
   * Allowed values for the <code>state</code> property.
   * @enum {String}
   * @readonly
   */
  exports.StateEnum = {
    /**
     * value: "draft"
     * @const
     */
    "draft": "draft",
    /**
     * value: "active"
     * @const
     */
    "active": "active",
    /**
     * value: "archived"
     * @const
     */
    "archived": "archived"  };


  return exports;
}));



},{"../ApiClient":16,"./AssignmentSubmission":28,"./GoogleClassroomCoursework":50,"./MediaAttachment":60}],26:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.AssignmentCopy = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The AssignmentCopy model module.
   * @module model/AssignmentCopy
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>AssignmentCopy</code>.
   * Assignment copy operation
   * @alias module:model/AssignmentCopy
   * @class
   * @param classroom {String} The destination classroom where the assignment will be copied
   */
  var exports = function(classroom) {
    var _this = this;

    _this['classroom'] = classroom;
  };

  /**
   * Constructs a <code>AssignmentCopy</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AssignmentCopy} obj Optional instance to populate.
   * @return {module:model/AssignmentCopy} The populated <code>AssignmentCopy</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('classroom')) {
        obj['classroom'] = ApiClient.convertToType(data['classroom'], 'String');
      }
    }
    return obj;
  }

  /**
   * The destination classroom where the assignment will be copied
   * @member {String} classroom
   */
  exports.prototype['classroom'] = undefined;



  return exports;
}));



},{"../ApiClient":16}],27:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ClassAttachmentCreation'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ClassAttachmentCreation'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.AssignmentCreation = factory(root.FlatApi.ApiClient, root.FlatApi.ClassAttachmentCreation);
  }
}(this, function(ApiClient, ClassAttachmentCreation) {
  'use strict';




  /**
   * The AssignmentCreation model module.
   * @module model/AssignmentCreation
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>AssignmentCreation</code>.
   * Assignment creation details
   * @alias module:model/AssignmentCreation
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>AssignmentCreation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AssignmentCreation} obj Optional instance to populate.
   * @return {module:model/AssignmentCreation} The populated <code>AssignmentCreation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('attachments')) {
        obj['attachments'] = ApiClient.convertToType(data['attachments'], [ClassAttachmentCreation]);
      }
      if (data.hasOwnProperty('dueDate')) {
        obj['dueDate'] = ApiClient.convertToType(data['dueDate'], 'Date');
      }
      if (data.hasOwnProperty('scheduledDate')) {
        obj['scheduledDate'] = ApiClient.convertToType(data['scheduledDate'], 'Date');
      }
    }
    return obj;
  }

  /**
   * Title of the assignment
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * Description and content of the assignment
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * @member {Array.<module:model/ClassAttachmentCreation>} attachments
   */
  exports.prototype['attachments'] = undefined;
  /**
   * The due date of this assignment, late submissions will be marked as paste due. If not set, the assignment won't have a due date. 
   * @member {Date} dueDate
   */
  exports.prototype['dueDate'] = undefined;
  /**
   * The publication (scheduled) date of the assignment. If this one is specified, the assignment will only be listed to the teachers of the class. 
   * @member {Date} scheduledDate
   */
  exports.prototype['scheduledDate'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./ClassAttachmentCreation":30}],28:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/GoogleClassroomSubmission', 'model/MediaAttachment'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./GoogleClassroomSubmission'), require('./MediaAttachment'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.AssignmentSubmission = factory(root.FlatApi.ApiClient, root.FlatApi.GoogleClassroomSubmission, root.FlatApi.MediaAttachment);
  }
}(this, function(ApiClient, GoogleClassroomSubmission, MediaAttachment) {
  'use strict';




  /**
   * The AssignmentSubmission model module.
   * @module model/AssignmentSubmission
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>AssignmentSubmission</code>.
   * Assignment Submission
   * @alias module:model/AssignmentSubmission
   * @class
   */
  var exports = function() {
    var _this = this;













  };

  /**
   * Constructs a <code>AssignmentSubmission</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AssignmentSubmission} obj Optional instance to populate.
   * @return {module:model/AssignmentSubmission} The populated <code>AssignmentSubmission</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('classroom')) {
        obj['classroom'] = ApiClient.convertToType(data['classroom'], 'String');
      }
      if (data.hasOwnProperty('assignment')) {
        obj['assignment'] = ApiClient.convertToType(data['assignment'], 'String');
      }
      if (data.hasOwnProperty('creator')) {
        obj['creator'] = ApiClient.convertToType(data['creator'], 'String');
      }
      if (data.hasOwnProperty('creationDate')) {
        obj['creationDate'] = ApiClient.convertToType(data['creationDate'], 'String');
      }
      if (data.hasOwnProperty('attachments')) {
        obj['attachments'] = ApiClient.convertToType(data['attachments'], [MediaAttachment]);
      }
      if (data.hasOwnProperty('submissionDate')) {
        obj['submissionDate'] = ApiClient.convertToType(data['submissionDate'], 'String');
      }
      if (data.hasOwnProperty('studentComment')) {
        obj['studentComment'] = ApiClient.convertToType(data['studentComment'], 'String');
      }
      if (data.hasOwnProperty('returnDate')) {
        obj['returnDate'] = ApiClient.convertToType(data['returnDate'], 'String');
      }
      if (data.hasOwnProperty('returnFeedback')) {
        obj['returnFeedback'] = ApiClient.convertToType(data['returnFeedback'], 'String');
      }
      if (data.hasOwnProperty('returnCreator')) {
        obj['returnCreator'] = ApiClient.convertToType(data['returnCreator'], 'String');
      }
      if (data.hasOwnProperty('googleClassroom')) {
        obj['googleClassroom'] = GoogleClassroomSubmission.constructFromObject(data['googleClassroom']);
      }
    }
    return obj;
  }

  /**
   * Unique identifier of the submission
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Unique identifier of the classroom where the assignment was posted 
   * @member {String} classroom
   */
  exports.prototype['classroom'] = undefined;
  /**
   * Unique identifier of the assignment
   * @member {String} assignment
   */
  exports.prototype['assignment'] = undefined;
  /**
   * The User identifier of the student who created the submission
   * @member {String} creator
   */
  exports.prototype['creator'] = undefined;
  /**
   * The date when the submission was created
   * @member {String} creationDate
   */
  exports.prototype['creationDate'] = undefined;
  /**
   * @member {Array.<module:model/MediaAttachment>} attachments
   */
  exports.prototype['attachments'] = undefined;
  /**
   * The date when the student submitted his work
   * @member {String} submissionDate
   */
  exports.prototype['submissionDate'] = undefined;
  /**
   * An optionnal comment sent by the student when submitting his work 
   * @member {String} studentComment
   */
  exports.prototype['studentComment'] = undefined;
  /**
   * The date when the teacher returned the work
   * @member {String} returnDate
   */
  exports.prototype['returnDate'] = undefined;
  /**
   * The feedback associated with the return
   * @member {String} returnFeedback
   */
  exports.prototype['returnFeedback'] = undefined;
  /**
   * The User unique identifier of the teacher who returned the submission 
   * @member {String} returnCreator
   */
  exports.prototype['returnCreator'] = undefined;
  /**
   * @member {module:model/GoogleClassroomSubmission} googleClassroom
   */
  exports.prototype['googleClassroom'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./GoogleClassroomSubmission":51,"./MediaAttachment":60}],29:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ClassAttachmentCreation'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ClassAttachmentCreation'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.AssignmentSubmissionUpdate = factory(root.FlatApi.ApiClient, root.FlatApi.ClassAttachmentCreation);
  }
}(this, function(ApiClient, ClassAttachmentCreation) {
  'use strict';




  /**
   * The AssignmentSubmissionUpdate model module.
   * @module model/AssignmentSubmissionUpdate
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>AssignmentSubmissionUpdate</code>.
   * Assignment Submission creation
   * @alias module:model/AssignmentSubmissionUpdate
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>AssignmentSubmissionUpdate</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AssignmentSubmissionUpdate} obj Optional instance to populate.
   * @return {module:model/AssignmentSubmissionUpdate} The populated <code>AssignmentSubmissionUpdate</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('attachments')) {
        obj['attachments'] = ApiClient.convertToType(data['attachments'], [ClassAttachmentCreation]);
      }
      if (data.hasOwnProperty('studentComment')) {
        obj['studentComment'] = ApiClient.convertToType(data['studentComment'], 'String');
      }
      if (data.hasOwnProperty('submit')) {
        obj['submit'] = ApiClient.convertToType(data['submit'], 'Boolean');
      }
      if (data.hasOwnProperty('returnFeedback')) {
        obj['returnFeedback'] = ApiClient.convertToType(data['returnFeedback'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {Array.<module:model/ClassAttachmentCreation>} attachments
   */
  exports.prototype['attachments'] = undefined;
  /**
   * An optionnal comment sent by the student when submitting his work 
   * @member {String} studentComment
   */
  exports.prototype['studentComment'] = undefined;
  /**
   * If `true`, the submission will be marked as done
   * @member {Boolean} submit
   */
  exports.prototype['submit'] = undefined;
  /**
   * The feedback associated with the return
   * @member {String} returnFeedback
   */
  exports.prototype['returnFeedback'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./ClassAttachmentCreation":30}],30:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ClassAttachmentCreation = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ClassAttachmentCreation model module.
   * @module model/ClassAttachmentCreation
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ClassAttachmentCreation</code>.
   * Attachment creation for an assignment or stream post. This attachment must contain a &#x60;score&#x60; or an &#x60;url&#x60;, all the details of this one will be resolved and returned as &#x60;ClassAttachment&#x60; once the assignment or stream post is created. 
   * @alias module:model/ClassAttachmentCreation
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>ClassAttachmentCreation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ClassAttachmentCreation} obj Optional instance to populate.
   * @return {module:model/ClassAttachmentCreation} The populated <code>ClassAttachmentCreation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('score')) {
        obj['score'] = ApiClient.convertToType(data['score'], 'String');
      }
      if (data.hasOwnProperty('url')) {
        obj['url'] = ApiClient.convertToType(data['url'], 'String');
      }
    }
    return obj;
  }

  /**
   * The type of the attachment posted
   * @member {module:model/ClassAttachmentCreation.TypeEnum} type
   */
  exports.prototype['type'] = undefined;
  /**
   * A unique Flat score identifier. The user creating the assignment must at least have read access to the document. If the user has admin rights, new group permissions will be automatically added for the teachers and students of the class. 
   * @member {String} score
   */
  exports.prototype['score'] = undefined;
  /**
   * The URL of the attachment.
   * @member {String} url
   */
  exports.prototype['url'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "flat"
     * @const
     */
    "flat": "flat",
    /**
     * value: "link"
     * @const
     */
    "link": "link",
    /**
     * value: "exercise"
     * @const
     */
    "exercise": "exercise"  };


  return exports;
}));



},{"../ApiClient":16}],31:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ClassCreation = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ClassCreation model module.
   * @module model/ClassCreation
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ClassCreation</code>.
   * Creation of a classroom
   * @alias module:model/ClassCreation
   * @class
   * @param name {String} The name of the new class
   */
  var exports = function(name) {
    var _this = this;

    _this['name'] = name;

  };

  /**
   * Constructs a <code>ClassCreation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ClassCreation} obj Optional instance to populate.
   * @return {module:model/ClassCreation} The populated <code>ClassCreation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('section')) {
        obj['section'] = ApiClient.convertToType(data['section'], 'String');
      }
    }
    return obj;
  }

  /**
   * The name of the new class
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The section of the new class
   * @member {String} section
   */
  exports.prototype['section'] = undefined;



  return exports;
}));



},{"../ApiClient":16}],32:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ClassDetailsCanvas', 'model/ClassDetailsClever', 'model/ClassDetailsGoogleClassroom', 'model/ClassDetailsGoogleDrive', 'model/ClassDetailsLti', 'model/ClassState', 'model/GroupDetails'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ClassDetailsCanvas'), require('./ClassDetailsClever'), require('./ClassDetailsGoogleClassroom'), require('./ClassDetailsGoogleDrive'), require('./ClassDetailsLti'), require('./ClassState'), require('./GroupDetails'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ClassDetails = factory(root.FlatApi.ApiClient, root.FlatApi.ClassDetailsCanvas, root.FlatApi.ClassDetailsClever, root.FlatApi.ClassDetailsGoogleClassroom, root.FlatApi.ClassDetailsGoogleDrive, root.FlatApi.ClassDetailsLti, root.FlatApi.ClassState, root.FlatApi.GroupDetails);
  }
}(this, function(ApiClient, ClassDetailsCanvas, ClassDetailsClever, ClassDetailsGoogleClassroom, ClassDetailsGoogleDrive, ClassDetailsLti, ClassState, GroupDetails) {
  'use strict';




  /**
   * The ClassDetails model module.
   * @module model/ClassDetails
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ClassDetails</code>.
   * A classroom
   * @alias module:model/ClassDetails
   * @class
   */
  var exports = function() {
    var _this = this;



















  };

  /**
   * Constructs a <code>ClassDetails</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ClassDetails} obj Optional instance to populate.
   * @return {module:model/ClassDetails} The populated <code>ClassDetails</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('state')) {
        obj['state'] = ClassState.constructFromObject(data['state']);
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('section')) {
        obj['section'] = ApiClient.convertToType(data['section'], 'String');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('organization')) {
        obj['organization'] = ApiClient.convertToType(data['organization'], 'String');
      }
      if (data.hasOwnProperty('owner')) {
        obj['owner'] = ApiClient.convertToType(data['owner'], 'String');
      }
      if (data.hasOwnProperty('creationDate')) {
        obj['creationDate'] = ApiClient.convertToType(data['creationDate'], 'Date');
      }
      if (data.hasOwnProperty('enrollmentCode')) {
        obj['enrollmentCode'] = ApiClient.convertToType(data['enrollmentCode'], 'String');
      }
      if (data.hasOwnProperty('theme')) {
        obj['theme'] = ApiClient.convertToType(data['theme'], 'String');
      }
      if (data.hasOwnProperty('assignmentsCount')) {
        obj['assignmentsCount'] = ApiClient.convertToType(data['assignmentsCount'], 'Number');
      }
      if (data.hasOwnProperty('studentsGroup')) {
        obj['studentsGroup'] = GroupDetails.constructFromObject(data['studentsGroup']);
      }
      if (data.hasOwnProperty('teachersGroup')) {
        obj['teachersGroup'] = GroupDetails.constructFromObject(data['teachersGroup']);
      }
      if (data.hasOwnProperty('googleClassroom')) {
        obj['googleClassroom'] = ClassDetailsGoogleClassroom.constructFromObject(data['googleClassroom']);
      }
      if (data.hasOwnProperty('googleDrive')) {
        obj['googleDrive'] = ClassDetailsGoogleDrive.constructFromObject(data['googleDrive']);
      }
      if (data.hasOwnProperty('lti')) {
        obj['lti'] = ClassDetailsLti.constructFromObject(data['lti']);
      }
      if (data.hasOwnProperty('canvas')) {
        obj['canvas'] = ClassDetailsCanvas.constructFromObject(data['canvas']);
      }
      if (data.hasOwnProperty('clever')) {
        obj['clever'] = ClassDetailsClever.constructFromObject(data['clever']);
      }
    }
    return obj;
  }

  /**
   * The unique identifier of the class
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * @member {module:model/ClassState} state
   */
  exports.prototype['state'] = undefined;
  /**
   * The name of the class
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The section of the class
   * @member {String} section
   */
  exports.prototype['section'] = undefined;
  /**
   * An optionnal description for this class
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * The unique identifier of the Organization owning this class
   * @member {String} organization
   */
  exports.prototype['organization'] = undefined;
  /**
   * The unique identifier of the User owning this class
   * @member {String} owner
   */
  exports.prototype['owner'] = undefined;
  /**
   * The date when the class was create
   * @member {Date} creationDate
   */
  exports.prototype['creationDate'] = undefined;
  /**
   * [Teachers only] The enrollment code that can be used by the students to join the class 
   * @member {String} enrollmentCode
   */
  exports.prototype['enrollmentCode'] = undefined;
  /**
   * The theme identifier using in Flat User Interface
   * @member {String} theme
   */
  exports.prototype['theme'] = undefined;
  /**
   * The number of assignments created in the class
   * @member {Number} assignmentsCount
   */
  exports.prototype['assignmentsCount'] = undefined;
  /**
   * @member {module:model/GroupDetails} studentsGroup
   */
  exports.prototype['studentsGroup'] = undefined;
  /**
   * @member {module:model/GroupDetails} teachersGroup
   */
  exports.prototype['teachersGroup'] = undefined;
  /**
   * @member {module:model/ClassDetailsGoogleClassroom} googleClassroom
   */
  exports.prototype['googleClassroom'] = undefined;
  /**
   * @member {module:model/ClassDetailsGoogleDrive} googleDrive
   */
  exports.prototype['googleDrive'] = undefined;
  /**
   * @member {module:model/ClassDetailsLti} lti
   */
  exports.prototype['lti'] = undefined;
  /**
   * @member {module:model/ClassDetailsCanvas} canvas
   */
  exports.prototype['canvas'] = undefined;
  /**
   * @member {module:model/ClassDetailsClever} clever
   */
  exports.prototype['clever'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./ClassDetailsCanvas":33,"./ClassDetailsClever":34,"./ClassDetailsGoogleClassroom":35,"./ClassDetailsGoogleDrive":36,"./ClassDetailsLti":37,"./ClassState":39,"./GroupDetails":53}],33:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ClassDetailsCanvas = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ClassDetailsCanvas model module.
   * @module model/ClassDetailsCanvas
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ClassDetailsCanvas</code>.
   * Meta information provided by Canvs LMS
   * @alias module:model/ClassDetailsCanvas
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>ClassDetailsCanvas</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ClassDetailsCanvas} obj Optional instance to populate.
   * @return {module:model/ClassDetailsCanvas} The populated <code>ClassDetailsCanvas</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('domain')) {
        obj['domain'] = ApiClient.convertToType(data['domain'], 'String');
      }
    }
    return obj;
  }

  /**
   * Unique identifier of the course on Canvas
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Canvas instance domain (e.g. \"canvas.instructure.com\")
   * @member {String} domain
   */
  exports.prototype['domain'] = undefined;



  return exports;
}));



},{"../ApiClient":16}],34:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ClassDetailsClever = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ClassDetailsClever model module.
   * @module model/ClassDetailsClever
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ClassDetailsClever</code>.
   * Clever.com section-related information
   * @alias module:model/ClassDetailsClever
   * @class
   */
  var exports = function() {
    var _this = this;








  };

  /**
   * Constructs a <code>ClassDetailsClever</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ClassDetailsClever} obj Optional instance to populate.
   * @return {module:model/ClassDetailsClever} The populated <code>ClassDetailsClever</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('creationDate')) {
        obj['creationDate'] = ApiClient.convertToType(data['creationDate'], 'Date');
      }
      if (data.hasOwnProperty('modificationDate')) {
        obj['modificationDate'] = ApiClient.convertToType(data['modificationDate'], 'Date');
      }
      if (data.hasOwnProperty('subject')) {
        obj['subject'] = ApiClient.convertToType(data['subject'], 'String');
      }
      if (data.hasOwnProperty('termName')) {
        obj['termName'] = ApiClient.convertToType(data['termName'], 'String');
      }
      if (data.hasOwnProperty('termStartDate')) {
        obj['termStartDate'] = ApiClient.convertToType(data['termStartDate'], 'Date');
      }
      if (data.hasOwnProperty('termEndDate')) {
        obj['termEndDate'] = ApiClient.convertToType(data['termEndDate'], 'Date');
      }
    }
    return obj;
  }

  /**
   * Clever section unique identifier
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The creation date of the section on clever
   * @member {Date} creationDate
   */
  exports.prototype['creationDate'] = undefined;
  /**
   * The last modification date of the section on clever
   * @member {Date} modificationDate
   */
  exports.prototype['modificationDate'] = undefined;
  /**
   * Normalized subject of the course
   * @member {module:model/ClassDetailsClever.SubjectEnum} subject
   */
  exports.prototype['subject'] = undefined;
  /**
   * Name of the term when this course happens
   * @member {String} termName
   */
  exports.prototype['termName'] = undefined;
  /**
   * Beginning date of the term
   * @member {Date} termStartDate
   */
  exports.prototype['termStartDate'] = undefined;
  /**
   * End date of the term
   * @member {Date} termEndDate
   */
  exports.prototype['termEndDate'] = undefined;


  /**
   * Allowed values for the <code>subject</code> property.
   * @enum {String}
   * @readonly
   */
  exports.SubjectEnum = {
    /**
     * value: "english/language arts"
     * @const
     */
    "english/language arts": "english/language arts",
    /**
     * value: "math"
     * @const
     */
    "math": "math",
    /**
     * value: "science"
     * @const
     */
    "science": "science",
    /**
     * value: "social studies"
     * @const
     */
    "social studies": "social studies",
    /**
     * value: "language"
     * @const
     */
    "language": "language",
    /**
     * value: "homeroom/advisory"
     * @const
     */
    "homeroom/advisory": "homeroom/advisory",
    /**
     * value: "interventions/online learning"
     * @const
     */
    "interventions/online learning": "interventions/online learning",
    /**
     * value: "technology and engineering"
     * @const
     */
    "technology and engineering": "technology and engineering",
    /**
     * value: "PE and health"
     * @const
     */
    "PE and health": "PE and health",
    /**
     * value: "arts and music"
     * @const
     */
    "arts and music": "arts and music",
    /**
     * value: "other"
     * @const
     */
    "other": "other"  };


  return exports;
}));



},{"../ApiClient":16}],35:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ClassDetailsGoogleClassroom = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ClassDetailsGoogleClassroom model module.
   * @module model/ClassDetailsGoogleClassroom
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ClassDetailsGoogleClassroom</code>.
   * Google Classroom course-related information
   * @alias module:model/ClassDetailsGoogleClassroom
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>ClassDetailsGoogleClassroom</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ClassDetailsGoogleClassroom} obj Optional instance to populate.
   * @return {module:model/ClassDetailsGoogleClassroom} The populated <code>ClassDetailsGoogleClassroom</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('alternateLink')) {
        obj['alternateLink'] = ApiClient.convertToType(data['alternateLink'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('section')) {
        obj['section'] = ApiClient.convertToType(data['section'], 'String');
      }
    }
    return obj;
  }

  /**
   * The course identifier on Google Classroom
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Absolute link to this course in the Classroom web UI
   * @member {String} alternateLink
   */
  exports.prototype['alternateLink'] = undefined;
  /**
   * The name of the course on Google Classroom
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The section of the course on Google Classroom
   * @member {String} section
   */
  exports.prototype['section'] = undefined;



  return exports;
}));



},{"../ApiClient":16}],36:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ClassDetailsGoogleDrive = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ClassDetailsGoogleDrive model module.
   * @module model/ClassDetailsGoogleDrive
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ClassDetailsGoogleDrive</code>.
   * Google Drive course-related information provided by Google Classroom
   * @alias module:model/ClassDetailsGoogleDrive
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>ClassDetailsGoogleDrive</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ClassDetailsGoogleDrive} obj Optional instance to populate.
   * @return {module:model/ClassDetailsGoogleDrive} The populated <code>ClassDetailsGoogleDrive</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('teacherFolderId')) {
        obj['teacherFolderId'] = ApiClient.convertToType(data['teacherFolderId'], 'String');
      }
      if (data.hasOwnProperty('teacherFolderAlternateLink')) {
        obj['teacherFolderAlternateLink'] = ApiClient.convertToType(data['teacherFolderAlternateLink'], 'String');
      }
    }
    return obj;
  }

  /**
   * [Teachers only] The Drive directory identifier of the teachers' folder 
   * @member {String} teacherFolderId
   */
  exports.prototype['teacherFolderId'] = undefined;
  /**
   * [Teachers only] The Drive URL of the teachers' folder 
   * @member {String} teacherFolderAlternateLink
   */
  exports.prototype['teacherFolderAlternateLink'] = undefined;



  return exports;
}));



},{"../ApiClient":16}],37:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ClassDetailsLti = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ClassDetailsLti model module.
   * @module model/ClassDetailsLti
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ClassDetailsLti</code>.
   * Meta information provided by the LTI consumer
   * @alias module:model/ClassDetailsLti
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>ClassDetailsLti</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ClassDetailsLti} obj Optional instance to populate.
   * @return {module:model/ClassDetailsLti} The populated <code>ClassDetailsLti</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('contextId')) {
        obj['contextId'] = ApiClient.convertToType(data['contextId'], 'String');
      }
      if (data.hasOwnProperty('contextTitle')) {
        obj['contextTitle'] = ApiClient.convertToType(data['contextTitle'], 'String');
      }
      if (data.hasOwnProperty('contextLabel')) {
        obj['contextLabel'] = ApiClient.convertToType(data['contextLabel'], 'String');
      }
    }
    return obj;
  }

  /**
   * Unique context identifier provided
   * @member {String} contextId
   */
  exports.prototype['contextId'] = undefined;
  /**
   * Context title
   * @member {String} contextTitle
   */
  exports.prototype['contextTitle'] = undefined;
  /**
   * Context label
   * @member {String} contextLabel
   */
  exports.prototype['contextLabel'] = undefined;



  return exports;
}));



},{"../ApiClient":16}],38:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ClassRoles = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';


  /**
   * Enum class ClassRoles.
   * @enum {}
   * @readonly
   */
  var exports = {
    /**
     * value: "teacher"
     * @const
     */
    "teacher": "teacher",
    /**
     * value: "student"
     * @const
     */
    "student": "student"  };

  /**
   * Returns a <code>ClassRoles</code> enum value from a Javascript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
   * @return {module:model/ClassRoles} The enum <code>ClassRoles</code> value.
   */
  exports.constructFromObject = function(object) {
    return object;
  }

  return exports;
}));



},{"../ApiClient":16}],39:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ClassState = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';


  /**
   * Enum class ClassState.
   * @enum {}
   * @readonly
   */
  var exports = {
    /**
     * value: "active"
     * @const
     */
    "active": "active",
    /**
     * value: "inactive"
     * @const
     */
    "inactive": "inactive",
    /**
     * value: "archived"
     * @const
     */
    "archived": "archived"  };

  /**
   * Returns a <code>ClassState</code> enum value from a Javascript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
   * @return {module:model/ClassState} The enum <code>ClassState</code> value.
   */
  exports.constructFromObject = function(object) {
    return object;
  }

  return exports;
}));



},{"../ApiClient":16}],40:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ClassUpdate = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ClassUpdate model module.
   * @module model/ClassUpdate
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ClassUpdate</code>.
   * Update of a classroom
   * @alias module:model/ClassUpdate
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>ClassUpdate</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ClassUpdate} obj Optional instance to populate.
   * @return {module:model/ClassUpdate} The populated <code>ClassUpdate</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('section')) {
        obj['section'] = ApiClient.convertToType(data['section'], 'String');
      }
    }
    return obj;
  }

  /**
   * The name of the class
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The section of the class
   * @member {String} section
   */
  exports.prototype['section'] = undefined;



  return exports;
}));



},{"../ApiClient":16}],41:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CollectionCapabilities', 'model/CollectionPrivacy', 'model/CollectionTitle', 'model/CollectionType', 'model/ResourceCollaborator', 'model/ResourceRights', 'model/UserPublicSummary'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./CollectionCapabilities'), require('./CollectionPrivacy'), require('./CollectionTitle'), require('./CollectionType'), require('./ResourceCollaborator'), require('./ResourceRights'), require('./UserPublicSummary'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.Collection = factory(root.FlatApi.ApiClient, root.FlatApi.CollectionCapabilities, root.FlatApi.CollectionPrivacy, root.FlatApi.CollectionTitle, root.FlatApi.CollectionType, root.FlatApi.ResourceCollaborator, root.FlatApi.ResourceRights, root.FlatApi.UserPublicSummary);
  }
}(this, function(ApiClient, CollectionCapabilities, CollectionPrivacy, CollectionTitle, CollectionType, ResourceCollaborator, ResourceRights, UserPublicSummary) {
  'use strict';




  /**
   * The Collection model module.
   * @module model/Collection
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>Collection</code>.
   * Collection of scores
   * @alias module:model/Collection
   * @class
   */
  var exports = function() {
    var _this = this;












  };

  /**
   * Constructs a <code>Collection</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Collection} obj Optional instance to populate.
   * @return {module:model/Collection} The populated <code>Collection</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = CollectionTitle.constructFromObject(data['title']);
      }
      if (data.hasOwnProperty('htmlUrl')) {
        obj['htmlUrl'] = ApiClient.convertToType(data['htmlUrl'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = CollectionType.constructFromObject(data['type']);
      }
      if (data.hasOwnProperty('privacy')) {
        obj['privacy'] = CollectionPrivacy.constructFromObject(data['privacy']);
      }
      if (data.hasOwnProperty('sharingKey')) {
        obj['sharingKey'] = ApiClient.convertToType(data['sharingKey'], 'String');
      }
      if (data.hasOwnProperty('app')) {
        obj['app'] = ApiClient.convertToType(data['app'], 'String');
      }
      if (data.hasOwnProperty('user')) {
        obj['user'] = UserPublicSummary.constructFromObject(data['user']);
      }
      if (data.hasOwnProperty('rights')) {
        obj['rights'] = ResourceRights.constructFromObject(data['rights']);
      }
      if (data.hasOwnProperty('collaborators')) {
        obj['collaborators'] = ApiClient.convertToType(data['collaborators'], [ResourceCollaborator]);
      }
      if (data.hasOwnProperty('capabilities')) {
        obj['capabilities'] = CollectionCapabilities.constructFromObject(data['capabilities']);
      }
    }
    return obj;
  }

  /**
   * Unique identifier of the collection
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * @member {module:model/CollectionTitle} title
   */
  exports.prototype['title'] = undefined;
  /**
   * The url where the collection can be viewed in a web browser
   * @member {String} htmlUrl
   */
  exports.prototype['htmlUrl'] = undefined;
  /**
   * @member {module:model/CollectionType} type
   */
  exports.prototype['type'] = undefined;
  /**
   * @member {module:model/CollectionPrivacy} privacy
   */
  exports.prototype['privacy'] = undefined;
  /**
   * The private sharing key of the collection (available when the `privacy` mode is set to `privateLink`)
   * @member {String} sharingKey
   */
  exports.prototype['sharingKey'] = undefined;
  /**
   * If this directory is dedicated to an app, the unique idenfier of this app
   * @member {String} app
   */
  exports.prototype['app'] = undefined;
  /**
   * @member {module:model/UserPublicSummary} user
   */
  exports.prototype['user'] = undefined;
  /**
   * @member {module:model/ResourceRights} rights
   */
  exports.prototype['rights'] = undefined;
  /**
   * The list of the collaborators of the collection
   * @member {Array.<module:model/ResourceCollaborator>} collaborators
   */
  exports.prototype['collaborators'] = undefined;
  /**
   * @member {module:model/CollectionCapabilities} capabilities
   */
  exports.prototype['capabilities'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./CollectionCapabilities":42,"./CollectionPrivacy":45,"./CollectionTitle":46,"./CollectionType":47,"./ResourceCollaborator":65,"./ResourceRights":67,"./UserPublicSummary":104}],42:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.CollectionCapabilities = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The CollectionCapabilities model module.
   * @module model/CollectionCapabilities
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>CollectionCapabilities</code>.
   * Capabilities the current user has on this collection. Each capability corresponds to a fine-grained action that a user may take.
   * @alias module:model/CollectionCapabilities
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>CollectionCapabilities</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CollectionCapabilities} obj Optional instance to populate.
   * @return {module:model/CollectionCapabilities} The populated <code>CollectionCapabilities</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('canEdit')) {
        obj['canEdit'] = ApiClient.convertToType(data['canEdit'], 'Boolean');
      }
      if (data.hasOwnProperty('canShare')) {
        obj['canShare'] = ApiClient.convertToType(data['canShare'], 'Boolean');
      }
      if (data.hasOwnProperty('canDelete')) {
        obj['canDelete'] = ApiClient.convertToType(data['canDelete'], 'Boolean');
      }
      if (data.hasOwnProperty('canAddScores')) {
        obj['canAddScores'] = ApiClient.convertToType(data['canAddScores'], 'Boolean');
      }
      if (data.hasOwnProperty('canDeleteScores')) {
        obj['canDeleteScores'] = ApiClient.convertToType(data['canDeleteScores'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * Whether the current user can modify the metadata for the collection 
   * @member {Boolean} canEdit
   */
  exports.prototype['canEdit'] = undefined;
  /**
   * Whether the current user can modify the sharing settings for the collection 
   * @member {Boolean} canShare
   */
  exports.prototype['canShare'] = undefined;
  /**
   * Whether the current user can delete the collection 
   * @member {Boolean} canDelete
   */
  exports.prototype['canDelete'] = undefined;
  /**
   * Whether the current user can add scores to the collection  If this collection has the `type` `trash`, this property will be set to `false`. Use `DELETE /v2/scores/{score}` to trash a score. 
   * @member {Boolean} canAddScores
   */
  exports.prototype['canAddScores'] = undefined;
  /**
   * Whether the current user can delete scores from the collection  If this collection has the `type` `trash`, this property will be set to `false`. Use `POST /v2/scores/{score}/untrash` to restore a score. 
   * @member {Boolean} canDeleteScores
   */
  exports.prototype['canDeleteScores'] = undefined;



  return exports;
}));



},{"../ApiClient":16}],43:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CollectionTitle'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./CollectionTitle'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.CollectionCreation = factory(root.FlatApi.ApiClient, root.FlatApi.CollectionTitle);
  }
}(this, function(ApiClient, CollectionTitle) {
  'use strict';




  /**
   * The CollectionCreation model module.
   * @module model/CollectionCreation
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>CollectionCreation</code>.
   * @alias module:model/CollectionCreation
   * @class
   * @param title {module:model/CollectionTitle} 
   */
  var exports = function(title) {
    var _this = this;

    _this['title'] = title;
  };

  /**
   * Constructs a <code>CollectionCreation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CollectionCreation} obj Optional instance to populate.
   * @return {module:model/CollectionCreation} The populated <code>CollectionCreation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('title')) {
        obj['title'] = CollectionTitle.constructFromObject(data['title']);
      }
    }
    return obj;
  }

  /**
   * @member {module:model/CollectionTitle} title
   */
  exports.prototype['title'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./CollectionTitle":46}],44:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CollectionTitle'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./CollectionTitle'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.CollectionModification = factory(root.FlatApi.ApiClient, root.FlatApi.CollectionTitle);
  }
}(this, function(ApiClient, CollectionTitle) {
  'use strict';




  /**
   * The CollectionModification model module.
   * @module model/CollectionModification
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>CollectionModification</code>.
   * Edit the collection metadata
   * @alias module:model/CollectionModification
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>CollectionModification</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CollectionModification} obj Optional instance to populate.
   * @return {module:model/CollectionModification} The populated <code>CollectionModification</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('title')) {
        obj['title'] = CollectionTitle.constructFromObject(data['title']);
      }
    }
    return obj;
  }

  /**
   * @member {module:model/CollectionTitle} title
   */
  exports.prototype['title'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./CollectionTitle":46}],45:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.CollectionPrivacy = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';


  /**
   * Enum class CollectionPrivacy.
   * @enum {}
   * @readonly
   */
  var exports = {
    /**
     * value: "private"
     * @const
     */
    "private": "private"  };

  /**
   * Returns a <code>CollectionPrivacy</code> enum value from a Javascript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
   * @return {module:model/CollectionPrivacy} The enum <code>CollectionPrivacy</code> value.
   */
  exports.constructFromObject = function(object) {
    return object;
  }

  return exports;
}));



},{"../ApiClient":16}],46:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.CollectionTitle = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The CollectionTitle model module.
   * @module model/CollectionTitle
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>CollectionTitle</code>.
   * The title of the collection
   * @alias module:model/CollectionTitle
   * @class
   */
  var exports = function() {
    var _this = this;

  };

  /**
   * Constructs a <code>CollectionTitle</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CollectionTitle} obj Optional instance to populate.
   * @return {module:model/CollectionTitle} The populated <code>CollectionTitle</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

    }
    return obj;
  }




  return exports;
}));



},{"../ApiClient":16}],47:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.CollectionType = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';


  /**
   * Enum class CollectionType.
   * @enum {}
   * @readonly
   */
  var exports = {
    /**
     * value: "root"
     * @const
     */
    "root": "root",
    /**
     * value: "regular"
     * @const
     */
    "regular": "regular",
    /**
     * value: "sharedWithMe"
     * @const
     */
    "sharedWithMe": "sharedWithMe",
    /**
     * value: "sharedWithGroup"
     * @const
     */
    "sharedWithGroup": "sharedWithGroup",
    /**
     * value: "trash"
     * @const
     */
    "trash": "trash"  };

  /**
   * Returns a <code>CollectionType</code> enum value from a Javascript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
   * @return {module:model/CollectionType} The enum <code>CollectionType</code> value.
   */
  exports.constructFromObject = function(object) {
    return object;
  }

  return exports;
}));



},{"../ApiClient":16}],48:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.FlatErrorResponse = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The FlatErrorResponse model module.
   * @module model/FlatErrorResponse
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>FlatErrorResponse</code>.
   * @alias module:model/FlatErrorResponse
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>FlatErrorResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FlatErrorResponse} obj Optional instance to populate.
   * @return {module:model/FlatErrorResponse} The populated <code>FlatErrorResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('code')) {
        obj['code'] = ApiClient.convertToType(data['code'], 'String');
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('param')) {
        obj['param'] = ApiClient.convertToType(data['param'], 'String');
      }
    }
    return obj;
  }

  /**
   * A corresponding code for this error
   * @member {String} code
   */
  exports.prototype['code'] = undefined;
  /**
   * A printable message for this message
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * An unique error identifier generated for the request
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The related parameter that caused the error
   * @member {String} param
   */
  exports.prototype['param'] = undefined;



  return exports;
}));



},{"../ApiClient":16}],49:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.FlatLocales = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';


  /**
   * Enum class FlatLocales.
   * @enum {}
   * @readonly
   */
  var exports = {
    /**
     * value: "en"
     * @const
     */
    "en": "en",
    /**
     * value: "es"
     * @const
     */
    "es": "es",
    /**
     * value: "fr"
     * @const
     */
    "fr": "fr",
    /**
     * value: "it"
     * @const
     */
    "it": "it",
    /**
     * value: "pl"
     * @const
     */
    "pl": "pl",
    /**
     * value: "ro"
     * @const
     */
    "ro": "ro",
    /**
     * value: "nl"
     * @const
     */
    "nl": "nl"  };

  /**
   * Returns a <code>FlatLocales</code> enum value from a Javascript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
   * @return {module:model/FlatLocales} The enum <code>FlatLocales</code> value.
   */
  exports.constructFromObject = function(object) {
    return object;
  }

  return exports;
}));



},{"../ApiClient":16}],50:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.GoogleClassroomCoursework = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The GoogleClassroomCoursework model module.
   * @module model/GoogleClassroomCoursework
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>GoogleClassroomCoursework</code>.
   * A coursework on Google Classroom
   * @alias module:model/GoogleClassroomCoursework
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>GoogleClassroomCoursework</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GoogleClassroomCoursework} obj Optional instance to populate.
   * @return {module:model/GoogleClassroomCoursework} The populated <code>GoogleClassroomCoursework</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('state')) {
        obj['state'] = ApiClient.convertToType(data['state'], 'String');
      }
      if (data.hasOwnProperty('alternateLink')) {
        obj['alternateLink'] = ApiClient.convertToType(data['alternateLink'], 'String');
      }
    }
    return obj;
  }

  /**
   * Identifier of the coursework assigned by Classroom
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * State of the coursework
   * @member {String} state
   */
  exports.prototype['state'] = undefined;
  /**
   * Absolute link to this coursework in the Classroom web UI
   * @member {String} alternateLink
   */
  exports.prototype['alternateLink'] = undefined;



  return exports;
}));



},{"../ApiClient":16}],51:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.GoogleClassroomSubmission = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The GoogleClassroomSubmission model module.
   * @module model/GoogleClassroomSubmission
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>GoogleClassroomSubmission</code>.
   * A coursework submission on Google Classroom
   * @alias module:model/GoogleClassroomSubmission
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>GoogleClassroomSubmission</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GoogleClassroomSubmission} obj Optional instance to populate.
   * @return {module:model/GoogleClassroomSubmission} The populated <code>GoogleClassroomSubmission</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('state')) {
        obj['state'] = ApiClient.convertToType(data['state'], 'String');
      }
      if (data.hasOwnProperty('alternateLink')) {
        obj['alternateLink'] = ApiClient.convertToType(data['alternateLink'], 'String');
      }
    }
    return obj;
  }

  /**
   * Identifier of the coursework submission assigned by Classroom
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * State of the submission on Google Classroom
   * @member {String} state
   */
  exports.prototype['state'] = undefined;
  /**
   * Absolute link to this coursework in the Classroom web UI
   * @member {String} alternateLink
   */
  exports.prototype['alternateLink'] = undefined;



  return exports;
}));



},{"../ApiClient":16}],52:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.Group = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Group model module.
   * @module model/Group
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>Group</code>.
   * A group of users
   * @alias module:model/Group
   * @class
   */
  var exports = function() {
    var _this = this;








  };

  /**
   * Constructs a <code>Group</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Group} obj Optional instance to populate.
   * @return {module:model/Group} The populated <code>Group</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('usersCount')) {
        obj['usersCount'] = ApiClient.convertToType(data['usersCount'], 'Number');
      }
      if (data.hasOwnProperty('readOnly')) {
        obj['readOnly'] = ApiClient.convertToType(data['readOnly'], 'Boolean');
      }
      if (data.hasOwnProperty('organization')) {
        obj['organization'] = ApiClient.convertToType(data['organization'], 'String');
      }
      if (data.hasOwnProperty('creationDate')) {
        obj['creationDate'] = ApiClient.convertToType(data['creationDate'], 'Date');
      }
    }
    return obj;
  }

  /**
   * The unique identifier of the group
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The display name of the group
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The type of the group: * `generic`: A group created by a Flat user * `classTeachers`: A group created automaticaly by Flat that contains   the teachers of a class * `classStudents`: A group created automaticaly by Flat that contains   the studnets of a class 
   * @member {module:model/Group.TypeEnum} type
   */
  exports.prototype['type'] = undefined;
  /**
   * The number of users in this group
   * @member {Number} usersCount
   */
  exports.prototype['usersCount'] = undefined;
  /**
   * `True` if the group is set in read-only 
   * @member {Boolean} readOnly
   */
  exports.prototype['readOnly'] = undefined;
  /**
   * If the group is related to an organization, this field will contain the unique identifier of the organization 
   * @member {String} organization
   */
  exports.prototype['organization'] = undefined;
  /**
   * The creation date of the group
   * @member {Date} creationDate
   */
  exports.prototype['creationDate'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "generic"
     * @const
     */
    "generic": "generic",
    /**
     * value: "classTeachers"
     * @const
     */
    "classTeachers": "classTeachers",
    /**
     * value: "classStudents"
     * @const
     */
    "classStudents": "classStudents"  };


  return exports;
}));



},{"../ApiClient":16}],53:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/GroupType'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./GroupType'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.GroupDetails = factory(root.FlatApi.ApiClient, root.FlatApi.GroupType);
  }
}(this, function(ApiClient, GroupType) {
  'use strict';




  /**
   * The GroupDetails model module.
   * @module model/GroupDetails
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>GroupDetails</code>.
   * The details of a group
   * @alias module:model/GroupDetails
   * @class
   */
  var exports = function() {
    var _this = this;








  };

  /**
   * Constructs a <code>GroupDetails</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GroupDetails} obj Optional instance to populate.
   * @return {module:model/GroupDetails} The populated <code>GroupDetails</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = GroupType.constructFromObject(data['type']);
      }
      if (data.hasOwnProperty('organization')) {
        obj['organization'] = ApiClient.convertToType(data['organization'], 'String');
      }
      if (data.hasOwnProperty('creationDate')) {
        obj['creationDate'] = ApiClient.convertToType(data['creationDate'], 'Date');
      }
      if (data.hasOwnProperty('usersCount')) {
        obj['usersCount'] = ApiClient.convertToType(data['usersCount'], 'Number');
      }
      if (data.hasOwnProperty('readOnly')) {
        obj['readOnly'] = ApiClient.convertToType(data['readOnly'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * The unique identifier of the group
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The displayable name of the group
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * @member {module:model/GroupType} type
   */
  exports.prototype['type'] = undefined;
  /**
   * The unique identifier of the Organization owning the group
   * @member {String} organization
   */
  exports.prototype['organization'] = undefined;
  /**
   * The date when the group was create
   * @member {Date} creationDate
   */
  exports.prototype['creationDate'] = undefined;
  /**
   * The number of students in this group
   * @member {Number} usersCount
   */
  exports.prototype['usersCount'] = undefined;
  /**
   * `true` if the properties and members of this group are in in read-only 
   * @member {Boolean} readOnly
   */
  exports.prototype['readOnly'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./GroupType":54}],54:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.GroupType = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';


  /**
   * Enum class GroupType.
   * @enum {}
   * @readonly
   */
  var exports = {
    /**
     * value: "generic"
     * @const
     */
    "generic": "generic",
    /**
     * value: "classTeachers"
     * @const
     */
    "classTeachers": "classTeachers",
    /**
     * value: "classStudents"
     * @const
     */
    "classStudents": "classStudents"  };

  /**
   * Returns a <code>GroupType</code> enum value from a Javascript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
   * @return {module:model/GroupType} The enum <code>GroupType</code> value.
   */
  exports.constructFromObject = function(object) {
    return object;
  }

  return exports;
}));



},{"../ApiClient":16}],55:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.LicenseMode = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';


  /**
   * Enum class LicenseMode.
   * @enum {}
   * @readonly
   */
  var exports = {
    /**
     * value: "credit"
     * @const
     */
    "credit": "credit",
    /**
     * value: "site"
     * @const
     */
    "site": "site"  };

  /**
   * Returns a <code>LicenseMode</code> enum value from a Javascript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
   * @return {module:model/LicenseMode} The enum <code>LicenseMode</code> value.
   */
  exports.constructFromObject = function(object) {
    return object;
  }

  return exports;
}));



},{"../ApiClient":16}],56:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.LicenseSources = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';


  /**
   * Enum class LicenseSources.
   * @enum {}
   * @readonly
   */
  var exports = {
    /**
     * value: "order"
     * @const
     */
    "order": "order",
    /**
     * value: "trial"
     * @const
     */
    "trial": "trial",
    /**
     * value: "voucher"
     * @const
     */
    "voucher": "voucher",
    /**
     * value: "distributor"
     * @const
     */
    "distributor": "distributor",
    /**
     * value: "subscription"
     * @const
     */
    "subscription": "subscription"  };

  /**
   * Returns a <code>LicenseSources</code> enum value from a Javascript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
   * @return {module:model/LicenseSources} The enum <code>LicenseSources</code> value.
   */
  exports.constructFromObject = function(object) {
    return object;
  }

  return exports;
}));



},{"../ApiClient":16}],57:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.LmsName = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';


  /**
   * Enum class LmsName.
   * @enum {}
   * @readonly
   */
  var exports = {
    /**
     * value: "canvas"
     * @const
     */
    "canvas": "canvas",
    /**
     * value: "moodle"
     * @const
     */
    "moodle": "moodle",
    /**
     * value: "schoology"
     * @const
     */
    "schoology": "schoology",
    /**
     * value: "blackboard"
     * @const
     */
    "blackboard": "blackboard",
    /**
     * value: "desire2learn"
     * @const
     */
    "desire2learn": "desire2learn",
    /**
     * value: "sakai"
     * @const
     */
    "sakai": "sakai",
    /**
     * value: "other"
     * @const
     */
    "other": "other"  };

  /**
   * Returns a <code>LmsName</code> enum value from a Javascript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
   * @return {module:model/LmsName} The enum <code>LmsName</code> value.
   */
  exports.constructFromObject = function(object) {
    return object;
  }

  return exports;
}));



},{"../ApiClient":16}],58:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/LmsName'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./LmsName'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.LtiCredentials = factory(root.FlatApi.ApiClient, root.FlatApi.LmsName);
  }
}(this, function(ApiClient, LmsName) {
  'use strict';




  /**
   * The LtiCredentials model module.
   * @module model/LtiCredentials
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>LtiCredentials</code>.
   * A couple of LTI 1.x OAuth credentials
   * @alias module:model/LtiCredentials
   * @class
   */
  var exports = function() {
    var _this = this;










  };

  /**
   * Constructs a <code>LtiCredentials</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/LtiCredentials} obj Optional instance to populate.
   * @return {module:model/LtiCredentials} The populated <code>LtiCredentials</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('lms')) {
        obj['lms'] = LmsName.constructFromObject(data['lms']);
      }
      if (data.hasOwnProperty('organization')) {
        obj['organization'] = ApiClient.convertToType(data['organization'], 'String');
      }
      if (data.hasOwnProperty('creator')) {
        obj['creator'] = ApiClient.convertToType(data['creator'], 'String');
      }
      if (data.hasOwnProperty('creationDate')) {
        obj['creationDate'] = ApiClient.convertToType(data['creationDate'], 'Date');
      }
      if (data.hasOwnProperty('lastUsage')) {
        obj['lastUsage'] = ApiClient.convertToType(data['lastUsage'], 'Date');
      }
      if (data.hasOwnProperty('consumerKey')) {
        obj['consumerKey'] = ApiClient.convertToType(data['consumerKey'], 'String');
      }
      if (data.hasOwnProperty('consumerSecret')) {
        obj['consumerSecret'] = ApiClient.convertToType(data['consumerSecret'], 'String');
      }
    }
    return obj;
  }

  /**
   * The unique identifier of this couple of credentials
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Name of the couple of credentials
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * @member {module:model/LmsName} lms
   */
  exports.prototype['lms'] = undefined;
  /**
   * The unique identifier of the Organization associated to these credentials
   * @member {String} organization
   */
  exports.prototype['organization'] = undefined;
  /**
   * Unique identifier of the user who created these credentials
   * @member {String} creator
   */
  exports.prototype['creator'] = undefined;
  /**
   * The creation date of thse credentials
   * @member {Date} creationDate
   */
  exports.prototype['creationDate'] = undefined;
  /**
   * The last time these credentials were used
   * @member {Date} lastUsage
   */
  exports.prototype['lastUsage'] = undefined;
  /**
   * OAuth 1 Consumer Key
   * @member {String} consumerKey
   */
  exports.prototype['consumerKey'] = undefined;
  /**
   * OAuth 1 Consumer Secret
   * @member {String} consumerSecret
   */
  exports.prototype['consumerSecret'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./LmsName":57}],59:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/LmsName'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./LmsName'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.LtiCredentialsCreation = factory(root.FlatApi.ApiClient, root.FlatApi.LmsName);
  }
}(this, function(ApiClient, LmsName) {
  'use strict';




  /**
   * The LtiCredentialsCreation model module.
   * @module model/LtiCredentialsCreation
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>LtiCredentialsCreation</code>.
   * Creation of a couple of LTI 1.x OAuth credentials
   * @alias module:model/LtiCredentialsCreation
   * @class
   * @param name {String} Name of the couple of credentials
   * @param lms {module:model/LmsName} 
   */
  var exports = function(name, lms) {
    var _this = this;

    _this['name'] = name;
    _this['lms'] = lms;
  };

  /**
   * Constructs a <code>LtiCredentialsCreation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/LtiCredentialsCreation} obj Optional instance to populate.
   * @return {module:model/LtiCredentialsCreation} The populated <code>LtiCredentialsCreation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('lms')) {
        obj['lms'] = LmsName.constructFromObject(data['lms']);
      }
    }
    return obj;
  }

  /**
   * Name of the couple of credentials
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * @member {module:model/LmsName} lms
   */
  exports.prototype['lms'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./LmsName":57}],60:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/MediaScoreSharingMode'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./MediaScoreSharingMode'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.MediaAttachment = factory(root.FlatApi.ApiClient, root.FlatApi.MediaScoreSharingMode);
  }
}(this, function(ApiClient, MediaScoreSharingMode) {
  'use strict';




  /**
   * The MediaAttachment model module.
   * @module model/MediaAttachment
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>MediaAttachment</code>.
   * Media attachment. The API will automatically resolve the details, oEmbed, and media available if possible and return them in this object 
   * @alias module:model/MediaAttachment
   * @class
   */
  var exports = function() {
    var _this = this;

















  };

  /**
   * Constructs a <code>MediaAttachment</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MediaAttachment} obj Optional instance to populate.
   * @return {module:model/MediaAttachment} The populated <code>MediaAttachment</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('score')) {
        obj['score'] = ApiClient.convertToType(data['score'], 'String');
      }
      if (data.hasOwnProperty('revision')) {
        obj['revision'] = ApiClient.convertToType(data['revision'], 'String');
      }
      if (data.hasOwnProperty('correct')) {
        obj['correct'] = ApiClient.convertToType(data['correct'], 'Boolean');
      }
      if (data.hasOwnProperty('sharingMode')) {
        obj['sharingMode'] = MediaScoreSharingMode.constructFromObject(data['sharingMode']);
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('html')) {
        obj['html'] = ApiClient.convertToType(data['html'], 'String');
      }
      if (data.hasOwnProperty('htmlWidth')) {
        obj['htmlWidth'] = ApiClient.convertToType(data['htmlWidth'], 'String');
      }
      if (data.hasOwnProperty('htmlHeight')) {
        obj['htmlHeight'] = ApiClient.convertToType(data['htmlHeight'], 'String');
      }
      if (data.hasOwnProperty('url')) {
        obj['url'] = ApiClient.convertToType(data['url'], 'String');
      }
      if (data.hasOwnProperty('thumbnailUrl')) {
        obj['thumbnailUrl'] = ApiClient.convertToType(data['thumbnailUrl'], 'String');
      }
      if (data.hasOwnProperty('thumbnailWidth')) {
        obj['thumbnailWidth'] = ApiClient.convertToType(data['thumbnailWidth'], 'String');
      }
      if (data.hasOwnProperty('thumbnailHeight')) {
        obj['thumbnailHeight'] = ApiClient.convertToType(data['thumbnailHeight'], 'String');
      }
      if (data.hasOwnProperty('authorName')) {
        obj['authorName'] = ApiClient.convertToType(data['authorName'], 'String');
      }
      if (data.hasOwnProperty('authorUrl')) {
        obj['authorUrl'] = ApiClient.convertToType(data['authorUrl'], 'String');
      }
    }
    return obj;
  }

  /**
   * The type of the assignment resolved: * `rich`, `photo`, `video` are attachment types that are automatically resolved from a `link` attachment. * A `flat` attachment is a score document where the unique identifier will be specified in the `score` property. Its sharing mode will be provided in the `sharingMode` property. 
   * @member {module:model/MediaAttachment.TypeEnum} type
   */
  exports.prototype['type'] = undefined;
  /**
   * An unique Flat score identifier
   * @member {String} score
   */
  exports.prototype['score'] = undefined;
  /**
   * An unique revision identifier of a score
   * @member {String} revision
   */
  exports.prototype['revision'] = undefined;
  /**
   * If the attachment is an exercise question, this state will describe if it is correct or not.For exercise assignments only.
   * @member {Boolean} correct
   */
  exports.prototype['correct'] = undefined;
  /**
   * @member {module:model/MediaScoreSharingMode} sharingMode
   */
  exports.prototype['sharingMode'] = undefined;
  /**
   * The resolved title of the attachment
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * The resolved description of the attachment
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * If the attachment type is `rich` or `video`, the HTML code of the media to display 
   * @member {String} html
   */
  exports.prototype['html'] = undefined;
  /**
   * If the `html` is available, the width of the widget
   * @member {String} htmlWidth
   */
  exports.prototype['htmlWidth'] = undefined;
  /**
   * If the `html` is available, the height of the widget
   * @member {String} htmlHeight
   */
  exports.prototype['htmlHeight'] = undefined;
  /**
   * The url of the attachment
   * @member {String} url
   */
  exports.prototype['url'] = undefined;
  /**
   * If the attachment type is `rich`, `video`, `photo` or `link`, a displayable thumbnail for this attachment 
   * @member {String} thumbnailUrl
   */
  exports.prototype['thumbnailUrl'] = undefined;
  /**
   * If the `thumbnailUrl` is available, the width of the thumbnail 
   * @member {String} thumbnailWidth
   */
  exports.prototype['thumbnailWidth'] = undefined;
  /**
   * If the `thumbnailUrl` is available, the width of the thumbnail 
   * @member {String} thumbnailHeight
   */
  exports.prototype['thumbnailHeight'] = undefined;
  /**
   * The resolved author name of the attachment
   * @member {String} authorName
   */
  exports.prototype['authorName'] = undefined;
  /**
   * The resolved author url of the attachment
   * @member {String} authorUrl
   */
  exports.prototype['authorUrl'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "rich"
     * @const
     */
    "rich": "rich",
    /**
     * value: "photo"
     * @const
     */
    "photo": "photo",
    /**
     * value: "video"
     * @const
     */
    "video": "video",
    /**
     * value: "link"
     * @const
     */
    "link": "link",
    /**
     * value: "flat"
     * @const
     */
    "flat": "flat",
    /**
     * value: "exercise"
     * @const
     */
    "exercise": "exercise"  };


  return exports;
}));



},{"../ApiClient":16,"./MediaScoreSharingMode":61}],61:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.MediaScoreSharingMode = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';


  /**
   * Enum class MediaScoreSharingMode.
   * @enum {}
   * @readonly
   */
  var exports = {
    /**
     * value: "read"
     * @const
     */
    "read": "read",
    /**
     * value: "write"
     * @const
     */
    "write": "write",
    /**
     * value: "copy"
     * @const
     */
    "copy": "copy"  };

  /**
   * Returns a <code>MediaScoreSharingMode</code> enum value from a Javascript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
   * @return {module:model/MediaScoreSharingMode} The enum <code>MediaScoreSharingMode</code> value.
   */
  exports.constructFromObject = function(object) {
    return object;
  }

  return exports;
}));



},{"../ApiClient":16}],62:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/OrganizationRoles'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./OrganizationRoles'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.OrganizationInvitation = factory(root.FlatApi.ApiClient, root.FlatApi.OrganizationRoles);
  }
}(this, function(ApiClient, OrganizationRoles) {
  'use strict';




  /**
   * The OrganizationInvitation model module.
   * @module model/OrganizationInvitation
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>OrganizationInvitation</code>.
   * Details of an invitation to join an organization
   * @alias module:model/OrganizationInvitation
   * @class
   */
  var exports = function() {
    var _this = this;








  };

  /**
   * Constructs a <code>OrganizationInvitation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrganizationInvitation} obj Optional instance to populate.
   * @return {module:model/OrganizationInvitation} The populated <code>OrganizationInvitation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('organization')) {
        obj['organization'] = ApiClient.convertToType(data['organization'], 'String');
      }
      if (data.hasOwnProperty('organizationRole')) {
        obj['organizationRole'] = OrganizationRoles.constructFromObject(data['organizationRole']);
      }
      if (data.hasOwnProperty('customCode')) {
        obj['customCode'] = ApiClient.convertToType(data['customCode'], 'String');
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('invitedBy')) {
        obj['invitedBy'] = ApiClient.convertToType(data['invitedBy'], 'String');
      }
      if (data.hasOwnProperty('usedBy')) {
        obj['usedBy'] = ApiClient.convertToType(data['usedBy'], 'String');
      }
    }
    return obj;
  }

  /**
   * The invitation unique identifier
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The unique identifier of the Organization owning this class
   * @member {String} organization
   */
  exports.prototype['organization'] = undefined;
  /**
   * @member {module:model/OrganizationRoles} organizationRole
   */
  exports.prototype['organizationRole'] = undefined;
  /**
   * Enrollment code to use when joining this organization
   * @member {String} customCode
   */
  exports.prototype['customCode'] = undefined;
  /**
   * The email address this invitation was sent to
   * @member {String} email
   */
  exports.prototype['email'] = undefined;
  /**
   * The unique identifier of the User who created this invitation
   * @member {String} invitedBy
   */
  exports.prototype['invitedBy'] = undefined;
  /**
   * The unique identifier of the User who used this invitation
   * @member {String} usedBy
   */
  exports.prototype['usedBy'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./OrganizationRoles":64}],63:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/OrganizationRoles'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./OrganizationRoles'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.OrganizationInvitationCreation = factory(root.FlatApi.ApiClient, root.FlatApi.OrganizationRoles);
  }
}(this, function(ApiClient, OrganizationRoles) {
  'use strict';




  /**
   * The OrganizationInvitationCreation model module.
   * @module model/OrganizationInvitationCreation
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>OrganizationInvitationCreation</code>.
   * The parameters to create an organization invitation
   * @alias module:model/OrganizationInvitationCreation
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>OrganizationInvitationCreation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrganizationInvitationCreation} obj Optional instance to populate.
   * @return {module:model/OrganizationInvitationCreation} The populated <code>OrganizationInvitationCreation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('organizationRole')) {
        obj['organizationRole'] = OrganizationRoles.constructFromObject(data['organizationRole']);
      }
    }
    return obj;
  }

  /**
   * The email address you want to send the invitation to
   * @member {String} email
   */
  exports.prototype['email'] = undefined;
  /**
   * @member {module:model/OrganizationRoles} organizationRole
   */
  exports.prototype['organizationRole'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./OrganizationRoles":64}],64:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.OrganizationRoles = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';


  /**
   * Enum class OrganizationRoles.
   * @enum {}
   * @readonly
   */
  var exports = {
    /**
     * value: "admin"
     * @const
     */
    "admin": "admin",
    /**
     * value: "billing"
     * @const
     */
    "billing": "billing",
    /**
     * value: "teacher"
     * @const
     */
    "teacher": "teacher",
    /**
     * value: "user"
     * @const
     */
    "user": "user"  };

  /**
   * Returns a <code>OrganizationRoles</code> enum value from a Javascript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
   * @return {module:model/OrganizationRoles} The enum <code>OrganizationRoles</code> value.
   */
  exports.constructFromObject = function(object) {
    return object;
  }

  return exports;
}));



},{"../ApiClient":16}],65:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Group', 'model/ResourceRights', 'model/UserPublic'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Group'), require('./ResourceRights'), require('./UserPublic'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ResourceCollaborator = factory(root.FlatApi.ApiClient, root.FlatApi.Group, root.FlatApi.ResourceRights, root.FlatApi.UserPublic);
  }
}(this, function(ApiClient, Group, ResourceRights, UserPublic) {
  'use strict';




  /**
   * The ResourceCollaborator model module.
   * @module model/ResourceCollaborator
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ResourceCollaborator</code>.
   * A collaborator of a score. The &#x60;userEmail&#x60; and &#x60;group&#x60; are only available if the requesting user is a collaborator of the related score (in this case these permissions will eventualy not be listed and exposed publicly). 
   * @alias module:model/ResourceCollaborator
   * @class
   * @implements module:model/ResourceRights
   */
  var exports = function() {
    var _this = this;

    ResourceRights.call(_this);






  };

  /**
   * Constructs a <code>ResourceCollaborator</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResourceCollaborator} obj Optional instance to populate.
   * @return {module:model/ResourceCollaborator} The populated <code>ResourceCollaborator</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      ResourceRights.constructFromObject(data, obj);
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('score')) {
        obj['score'] = ApiClient.convertToType(data['score'], 'String');
      }
      if (data.hasOwnProperty('collection')) {
        obj['collection'] = ApiClient.convertToType(data['collection'], 'String');
      }
      if (data.hasOwnProperty('user')) {
        obj['user'] = UserPublic.constructFromObject(data['user']);
      }
      if (data.hasOwnProperty('group')) {
        obj['group'] = Group.constructFromObject(data['group']);
      }
      if (data.hasOwnProperty('userEmail')) {
        obj['userEmail'] = ApiClient.convertToType(data['userEmail'], 'String');
      }
    }
    return obj;
  }

  /**
   * The unique identifier of the permission
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * If this object is a permission of a score, this property will contain the unique identifier of the score
   * @member {String} score
   */
  exports.prototype['score'] = undefined;
  /**
   * If this object is a permission of a collection, this property will contain the unique identifier of the collection
   * @member {String} collection
   */
  exports.prototype['collection'] = undefined;
  /**
   * @member {module:model/UserPublic} user
   */
  exports.prototype['user'] = undefined;
  /**
   * @member {module:model/Group} group
   */
  exports.prototype['group'] = undefined;
  /**
   * If the collaborator is not a user of Flat yet, this field will contain his email. 
   * @member {String} userEmail
   */
  exports.prototype['userEmail'] = undefined;

  // Implement ResourceRights interface:
  /**
   * `True` if the current user can read the current document 
   * @member {Boolean} aclRead
   * @default false
   */
exports.prototype['aclRead'] = false;

  /**
   * `True` if the current user can modify the current document.  If this is a right of a Collection, the capabilities of the associated user can be lower than this permission, check out the `capabilities` property as the end-user to have the complete possibilities with the collection. 
   * @member {Boolean} aclWrite
   * @default false
   */
exports.prototype['aclWrite'] = false;

  /**
   * `True` if the current user can manage the current document (i.e. share, delete)  If this is a right of a Collection, the capabilities of the associated user can be lower than this permission, check out the `capabilities` property as the end-user to have the complete possibilities with the collection. 
   * @member {Boolean} aclAdmin
   * @default false
   */
exports.prototype['aclAdmin'] = false;



  return exports;
}));



},{"../ApiClient":16,"./Group":52,"./ResourceRights":67,"./UserPublic":103}],66:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ResourceCollaboratorCreation = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ResourceCollaboratorCreation model module.
   * @module model/ResourceCollaboratorCreation
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ResourceCollaboratorCreation</code>.
   * Add a collaborator to a resource.
   * @alias module:model/ResourceCollaboratorCreation
   * @class
   */
  var exports = function() {
    var _this = this;








  };

  /**
   * Constructs a <code>ResourceCollaboratorCreation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResourceCollaboratorCreation} obj Optional instance to populate.
   * @return {module:model/ResourceCollaboratorCreation} The populated <code>ResourceCollaboratorCreation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('user')) {
        obj['user'] = ApiClient.convertToType(data['user'], 'String');
      }
      if (data.hasOwnProperty('group')) {
        obj['group'] = ApiClient.convertToType(data['group'], 'String');
      }
      if (data.hasOwnProperty('userEmail')) {
        obj['userEmail'] = ApiClient.convertToType(data['userEmail'], 'String');
      }
      if (data.hasOwnProperty('userToken')) {
        obj['userToken'] = ApiClient.convertToType(data['userToken'], 'String');
      }
      if (data.hasOwnProperty('aclRead')) {
        obj['aclRead'] = ApiClient.convertToType(data['aclRead'], 'Boolean');
      }
      if (data.hasOwnProperty('aclWrite')) {
        obj['aclWrite'] = ApiClient.convertToType(data['aclWrite'], 'Boolean');
      }
      if (data.hasOwnProperty('aclAdmin')) {
        obj['aclAdmin'] = ApiClient.convertToType(data['aclAdmin'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * The unique identifier of a Flat user
   * @member {String} user
   */
  exports.prototype['user'] = undefined;
  /**
   * The unique identifier of a Flat group
   * @member {String} group
   */
  exports.prototype['group'] = undefined;
  /**
   * Fill this field to invite an individual user by email. 
   * @member {String} userEmail
   */
  exports.prototype['userEmail'] = undefined;
  /**
   * Token received in an invitation to join the score. 
   * @member {String} userToken
   */
  exports.prototype['userToken'] = undefined;
  /**
   * `True` if the related user can read the score. (probably true if the user has a permission on the document). 
   * @member {Boolean} aclRead
   * @default true
   */
  exports.prototype['aclRead'] = true;
  /**
   * `True` if the related user can modify the score. 
   * @member {Boolean} aclWrite
   * @default false
   */
  exports.prototype['aclWrite'] = false;
  /**
   * `True` if the related user can can manage the current document, i.e. changing the document permissions and deleting the document 
   * @member {Boolean} aclAdmin
   * @default false
   */
  exports.prototype['aclAdmin'] = false;



  return exports;
}));



},{"../ApiClient":16}],67:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ResourceRights = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ResourceRights model module.
   * @module model/ResourceRights
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ResourceRights</code>.
   * The rights of the current user on a score or collection
   * @alias module:model/ResourceRights
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>ResourceRights</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResourceRights} obj Optional instance to populate.
   * @return {module:model/ResourceRights} The populated <code>ResourceRights</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('aclRead')) {
        obj['aclRead'] = ApiClient.convertToType(data['aclRead'], 'Boolean');
      }
      if (data.hasOwnProperty('aclWrite')) {
        obj['aclWrite'] = ApiClient.convertToType(data['aclWrite'], 'Boolean');
      }
      if (data.hasOwnProperty('aclAdmin')) {
        obj['aclAdmin'] = ApiClient.convertToType(data['aclAdmin'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * `True` if the current user can read the current document 
   * @member {Boolean} aclRead
   * @default false
   */
  exports.prototype['aclRead'] = false;
  /**
   * `True` if the current user can modify the current document.  If this is a right of a Collection, the capabilities of the associated user can be lower than this permission, check out the `capabilities` property as the end-user to have the complete possibilities with the collection. 
   * @member {Boolean} aclWrite
   * @default false
   */
  exports.prototype['aclWrite'] = false;
  /**
   * `True` if the current user can manage the current document (i.e. share, delete)  If this is a right of a Collection, the capabilities of the associated user can be lower than this permission, check out the `capabilities` property as the end-user to have the complete possibilities with the collection. 
   * @member {Boolean} aclAdmin
   * @default false
   */
  exports.prototype['aclAdmin'] = false;



  return exports;
}));



},{"../ApiClient":16}],68:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ResourceSharingKey = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ResourceSharingKey model module.
   * @module model/ResourceSharingKey
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ResourceSharingKey</code>.
   * When using the &#x60;privacy&#x60; mode &#x60;privateLink&#x60;, this property can be used to set a custom sharing key, otherwise a new key will be generated.
   * @alias module:model/ResourceSharingKey
   * @class
   */
  var exports = function() {
    var _this = this;

  };

  /**
   * Constructs a <code>ResourceSharingKey</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResourceSharingKey} obj Optional instance to populate.
   * @return {module:model/ResourceSharingKey} The populated <code>ResourceSharingKey</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

    }
    return obj;
  }




  return exports;
}));



},{"../ApiClient":16}],69:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ScoreCommentContext'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ScoreCommentContext'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreComment = factory(root.FlatApi.ApiClient, root.FlatApi.ScoreCommentContext);
  }
}(this, function(ApiClient, ScoreCommentContext) {
  'use strict';




  /**
   * The ScoreComment model module.
   * @module model/ScoreComment
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreComment</code>.
   * Comment added on a sheet music
   * @alias module:model/ScoreComment
   * @class
   */
  var exports = function() {
    var _this = this;
















  };

  /**
   * Constructs a <code>ScoreComment</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreComment} obj Optional instance to populate.
   * @return {module:model/ScoreComment} The populated <code>ScoreComment</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('user')) {
        obj['user'] = ApiClient.convertToType(data['user'], 'String');
      }
      if (data.hasOwnProperty('score')) {
        obj['score'] = ApiClient.convertToType(data['score'], 'String');
      }
      if (data.hasOwnProperty('revision')) {
        obj['revision'] = ApiClient.convertToType(data['revision'], 'String');
      }
      if (data.hasOwnProperty('replyTo')) {
        obj['replyTo'] = ApiClient.convertToType(data['replyTo'], 'String');
      }
      if (data.hasOwnProperty('date')) {
        obj['date'] = ApiClient.convertToType(data['date'], 'Date');
      }
      if (data.hasOwnProperty('modificationDate')) {
        obj['modificationDate'] = ApiClient.convertToType(data['modificationDate'], 'Date');
      }
      if (data.hasOwnProperty('comment')) {
        obj['comment'] = ApiClient.convertToType(data['comment'], 'String');
      }
      if (data.hasOwnProperty('rawComment')) {
        obj['rawComment'] = ApiClient.convertToType(data['rawComment'], 'String');
      }
      if (data.hasOwnProperty('context')) {
        obj['context'] = ScoreCommentContext.constructFromObject(data['context']);
      }
      if (data.hasOwnProperty('mentions')) {
        obj['mentions'] = ApiClient.convertToType(data['mentions'], ['String']);
      }
      if (data.hasOwnProperty('resolved')) {
        obj['resolved'] = ApiClient.convertToType(data['resolved'], 'Boolean');
      }
      if (data.hasOwnProperty('resolvedBy')) {
        obj['resolvedBy'] = ApiClient.convertToType(data['resolvedBy'], 'String');
      }
      if (data.hasOwnProperty('spam')) {
        obj['spam'] = ApiClient.convertToType(data['spam'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * The comment unique identifier
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The type of the comment
   * @member {module:model/ScoreComment.TypeEnum} type
   */
  exports.prototype['type'] = undefined;
  /**
   * The author unique identifier
   * @member {String} user
   */
  exports.prototype['user'] = undefined;
  /**
   * The unique identifier of the score where the comment was posted
   * @member {String} score
   */
  exports.prototype['score'] = undefined;
  /**
   * The unique identifier of revision the comment was posted
   * @member {String} revision
   */
  exports.prototype['revision'] = undefined;
  /**
   * When the comment is a reply to another comment, the unique identifier of the parent comment 
   * @member {String} replyTo
   */
  exports.prototype['replyTo'] = undefined;
  /**
   * The date when the comment was posted
   * @member {Date} date
   */
  exports.prototype['date'] = undefined;
  /**
   * The date of the last comment modification
   * @member {Date} modificationDate
   */
  exports.prototype['modificationDate'] = undefined;
  /**
   * The comment text that can includes mentions using the following format: `@[id:username]`. 
   * @member {String} comment
   */
  exports.prototype['comment'] = undefined;
  /**
   * A raw version of the comment, that can be displayed without parsing the mentions. 
   * @member {String} rawComment
   */
  exports.prototype['rawComment'] = undefined;
  /**
   * @member {module:model/ScoreCommentContext} context
   */
  exports.prototype['context'] = undefined;
  /**
   * The list of user identifier mentioned on the score
   * @member {Array.<String>} mentions
   */
  exports.prototype['mentions'] = undefined;
  /**
   * For inline comments, the comment can be marked as resolved and will be hidden in the future responses 
   * @member {Boolean} resolved
   */
  exports.prototype['resolved'] = undefined;
  /**
   * If the user is marked as resolved, this will contain the unique identifier of the User who marked this comment as resolved 
   * @member {String} resolvedBy
   */
  exports.prototype['resolvedBy'] = undefined;
  /**
   * `true  if the message has been detected as spam and hidden from other users 
   * @member {Boolean} spam
   */
  exports.prototype['spam'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "document"
     * @const
     */
    "document": "document",
    /**
     * value: "inline"
     * @const
     */
    "inline": "inline"  };


  return exports;
}));



},{"../ApiClient":16,"./ScoreCommentContext":70}],70:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreCommentContext = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ScoreCommentContext model module.
   * @module model/ScoreCommentContext
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreCommentContext</code>.
   * The context of the comment (for inline/contextualized comments). A context will include all the information related to the location of the comment (i.e. score parts, range of measure, time position). 
   * @alias module:model/ScoreCommentContext
   * @class
   * @param partUuid {String} The unique identifier (UUID) of the score part
   * @param staffIdx {Number} The identififer of the staff
   * @param measureUuids {Array.<String>} The list of measure UUIds
   * @param startTimePos {Number} 
   * @param stopTimePos {Number} 
   * @param startDpq {Number} 
   * @param stopDpq {Number} 
   */
  var exports = function(partUuid, staffIdx, measureUuids, startTimePos, stopTimePos, startDpq, stopDpq) {
    var _this = this;

    _this['partUuid'] = partUuid;
    _this['staffIdx'] = staffIdx;
    _this['measureUuids'] = measureUuids;
    _this['startTimePos'] = startTimePos;
    _this['stopTimePos'] = stopTimePos;
    _this['startDpq'] = startDpq;
    _this['stopDpq'] = stopDpq;
  };

  /**
   * Constructs a <code>ScoreCommentContext</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreCommentContext} obj Optional instance to populate.
   * @return {module:model/ScoreCommentContext} The populated <code>ScoreCommentContext</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('partUuid')) {
        obj['partUuid'] = ApiClient.convertToType(data['partUuid'], 'String');
      }
      if (data.hasOwnProperty('staffIdx')) {
        obj['staffIdx'] = ApiClient.convertToType(data['staffIdx'], 'Number');
      }
      if (data.hasOwnProperty('measureUuids')) {
        obj['measureUuids'] = ApiClient.convertToType(data['measureUuids'], ['String']);
      }
      if (data.hasOwnProperty('startTimePos')) {
        obj['startTimePos'] = ApiClient.convertToType(data['startTimePos'], 'Number');
      }
      if (data.hasOwnProperty('stopTimePos')) {
        obj['stopTimePos'] = ApiClient.convertToType(data['stopTimePos'], 'Number');
      }
      if (data.hasOwnProperty('startDpq')) {
        obj['startDpq'] = ApiClient.convertToType(data['startDpq'], 'Number');
      }
      if (data.hasOwnProperty('stopDpq')) {
        obj['stopDpq'] = ApiClient.convertToType(data['stopDpq'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The unique identifier (UUID) of the score part
   * @member {String} partUuid
   */
  exports.prototype['partUuid'] = undefined;
  /**
   * The identififer of the staff
   * @member {Number} staffIdx
   */
  exports.prototype['staffIdx'] = undefined;
  /**
   * The list of measure UUIds
   * @member {Array.<String>} measureUuids
   */
  exports.prototype['measureUuids'] = undefined;
  /**
   * @member {Number} startTimePos
   */
  exports.prototype['startTimePos'] = undefined;
  /**
   * @member {Number} stopTimePos
   */
  exports.prototype['stopTimePos'] = undefined;
  /**
   * @member {Number} startDpq
   */
  exports.prototype['startDpq'] = undefined;
  /**
   * @member {Number} stopDpq
   */
  exports.prototype['stopDpq'] = undefined;



  return exports;
}));



},{"../ApiClient":16}],71:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ScoreCommentContext'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ScoreCommentContext'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreCommentCreation = factory(root.FlatApi.ApiClient, root.FlatApi.ScoreCommentContext);
  }
}(this, function(ApiClient, ScoreCommentContext) {
  'use strict';




  /**
   * The ScoreCommentCreation model module.
   * @module model/ScoreCommentCreation
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreCommentCreation</code>.
   * Creation of a comment
   * @alias module:model/ScoreCommentCreation
   * @class
   * @param comment {String} The comment text that can includes mentions using the following format: `@[id:username]`. 
   */
  var exports = function(comment) {
    var _this = this;


    _this['comment'] = comment;




  };

  /**
   * Constructs a <code>ScoreCommentCreation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreCommentCreation} obj Optional instance to populate.
   * @return {module:model/ScoreCommentCreation} The populated <code>ScoreCommentCreation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('revision')) {
        obj['revision'] = ApiClient.convertToType(data['revision'], 'String');
      }
      if (data.hasOwnProperty('comment')) {
        obj['comment'] = ApiClient.convertToType(data['comment'], 'String');
      }
      if (data.hasOwnProperty('rawComment')) {
        obj['rawComment'] = ApiClient.convertToType(data['rawComment'], 'String');
      }
      if (data.hasOwnProperty('mentions')) {
        obj['mentions'] = ApiClient.convertToType(data['mentions'], ['String']);
      }
      if (data.hasOwnProperty('replyTo')) {
        obj['replyTo'] = ApiClient.convertToType(data['replyTo'], 'String');
      }
      if (data.hasOwnProperty('context')) {
        obj['context'] = ScoreCommentContext.constructFromObject(data['context']);
      }
    }
    return obj;
  }

  /**
   * The unique indentifier of the revision of the score where the comment was added. If this property is unspecified or contains \"last\", the API will automatically take the last revision created. 
   * @member {String} revision
   */
  exports.prototype['revision'] = undefined;
  /**
   * The comment text that can includes mentions using the following format: `@[id:username]`. 
   * @member {String} comment
   */
  exports.prototype['comment'] = undefined;
  /**
   * A raw version of the comment, that can be displayed without the mentions. If you use mentions, this property must be set. 
   * @member {String} rawComment
   */
  exports.prototype['rawComment'] = undefined;
  /**
   * The list of user identifiers mentioned in this comment
   * @member {Array.<String>} mentions
   */
  exports.prototype['mentions'] = undefined;
  /**
   * When the comment is a reply to another comment, the unique identifier of the parent comment 
   * @member {String} replyTo
   */
  exports.prototype['replyTo'] = undefined;
  /**
   * @member {module:model/ScoreCommentContext} context
   */
  exports.prototype['context'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./ScoreCommentContext":70}],72:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ScoreCommentContext'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ScoreCommentContext'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreCommentUpdate = factory(root.FlatApi.ApiClient, root.FlatApi.ScoreCommentContext);
  }
}(this, function(ApiClient, ScoreCommentContext) {
  'use strict';




  /**
   * The ScoreCommentUpdate model module.
   * @module model/ScoreCommentUpdate
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreCommentUpdate</code>.
   * Update of a comment
   * @alias module:model/ScoreCommentUpdate
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>ScoreCommentUpdate</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreCommentUpdate} obj Optional instance to populate.
   * @return {module:model/ScoreCommentUpdate} The populated <code>ScoreCommentUpdate</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('revision')) {
        obj['revision'] = ApiClient.convertToType(data['revision'], 'String');
      }
      if (data.hasOwnProperty('comment')) {
        obj['comment'] = ApiClient.convertToType(data['comment'], 'String');
      }
      if (data.hasOwnProperty('rawComment')) {
        obj['rawComment'] = ApiClient.convertToType(data['rawComment'], 'String');
      }
      if (data.hasOwnProperty('context')) {
        obj['context'] = ScoreCommentContext.constructFromObject(data['context']);
      }
    }
    return obj;
  }

  /**
   * The unique indentifier of the revision of the score where the comment was added. If this property is unspecified or contains \"last\", the API will automatically take the last revision created. 
   * @member {String} revision
   */
  exports.prototype['revision'] = undefined;
  /**
   * The comment text that can includes mentions using the following format: `@[id:username]`. 
   * @member {String} comment
   */
  exports.prototype['comment'] = undefined;
  /**
   * A raw version of the comment, that can be displayed without the mentions. If you use mentions, this property must be set. 
   * @member {String} rawComment
   */
  exports.prototype['rawComment'] = undefined;
  /**
   * @member {module:model/ScoreCommentContext} context
   */
  exports.prototype['context'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./ScoreCommentContext":70}],73:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreCommentsCounts = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ScoreCommentsCounts model module.
   * @module model/ScoreCommentsCounts
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreCommentsCounts</code>.
   * A computed version of the total, unique, weekly and monthly number of comments added on the documents (this doesn&#39;t include inline comments). 
   * @alias module:model/ScoreCommentsCounts
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>ScoreCommentsCounts</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreCommentsCounts} obj Optional instance to populate.
   * @return {module:model/ScoreCommentsCounts} The populated <code>ScoreCommentsCounts</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
      if (data.hasOwnProperty('unique')) {
        obj['unique'] = ApiClient.convertToType(data['unique'], 'Number');
      }
      if (data.hasOwnProperty('weekly')) {
        obj['weekly'] = ApiClient.convertToType(data['weekly'], 'Number');
      }
      if (data.hasOwnProperty('monthly')) {
        obj['monthly'] = ApiClient.convertToType(data['monthly'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The total number of comments added on the score
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;
  /**
   * The unique (1/user) number of comments added on the score
   * @member {Number} unique
   */
  exports.prototype['unique'] = undefined;
  /**
   * The weekly unique number of comments added on the score
   * @member {Number} weekly
   */
  exports.prototype['weekly'] = undefined;
  /**
   * The monthly unique number of comments added on the score
   * @member {Number} monthly
   */
  exports.prototype['monthly'] = undefined;



  return exports;
}));



},{"../ApiClient":16}],74:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ScoreData', 'model/ScoreDataEncoding', 'model/ScorePrivacy', 'model/ScoreSource'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ScoreData'), require('./ScoreDataEncoding'), require('./ScorePrivacy'), require('./ScoreSource'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreCreation = factory(root.FlatApi.ApiClient, root.FlatApi.ScoreData, root.FlatApi.ScoreDataEncoding, root.FlatApi.ScorePrivacy, root.FlatApi.ScoreSource);
  }
}(this, function(ApiClient, ScoreData, ScoreDataEncoding, ScorePrivacy, ScoreSource) {
  'use strict';




  /**
   * The ScoreCreation model module.
   * @module model/ScoreCreation
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreCreation</code>.
   * A new created score
   * @alias module:model/ScoreCreation
   * @class
   * @param privacy {module:model/ScorePrivacy} 
   */
  var exports = function(privacy) {
    var _this = this;


    _this['privacy'] = privacy;





  };

  /**
   * Constructs a <code>ScoreCreation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreCreation} obj Optional instance to populate.
   * @return {module:model/ScoreCreation} The populated <code>ScoreCreation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('privacy')) {
        obj['privacy'] = ScorePrivacy.constructFromObject(data['privacy']);
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ScoreData.constructFromObject(data['data']);
      }
      if (data.hasOwnProperty('dataEncoding')) {
        obj['dataEncoding'] = ScoreDataEncoding.constructFromObject(data['dataEncoding']);
      }
      if (data.hasOwnProperty('source')) {
        obj['source'] = ScoreSource.constructFromObject(data['source']);
      }
      if (data.hasOwnProperty('collection')) {
        obj['collection'] = ApiClient.convertToType(data['collection'], 'String');
      }
      if (data.hasOwnProperty('googleDriveFolder')) {
        obj['googleDriveFolder'] = ApiClient.convertToType(data['googleDriveFolder'], 'String');
      }
    }
    return obj;
  }

  /**
   * The title of the new score. If the title is too long, the API may trim this one.  If this title is not specified, the API will try to (in this order):   - Use the name of the file for files from a specified `source` (e.g. Google Drive)   - Use the title contained in the file (e.g. [`movement-title`](https://usermanuals.musicxml.com/MusicXML/Content/EL-MusicXML-movement-title.htm) or [`credit-words`](https://usermanuals.musicxml.com/MusicXML/Content/EL-MusicXML-credit-words.htm) for [MusicXML](http://www.musicxml.com/) files).   - Set a default title (e.g. \"New Music Score\") 
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * @member {module:model/ScorePrivacy} privacy
   */
  exports.prototype['privacy'] = undefined;
  /**
   * @member {module:model/ScoreData} data
   */
  exports.prototype['data'] = undefined;
  /**
   * @member {module:model/ScoreDataEncoding} dataEncoding
   */
  exports.prototype['dataEncoding'] = undefined;
  /**
   * @member {module:model/ScoreSource} source
   */
  exports.prototype['source'] = undefined;
  /**
   * Unique identifier of a collection where the score will be created. If no collection identifier is provided, the score will be stored in the `root` directory. 
   * @member {String} collection
   */
  exports.prototype['collection'] = undefined;
  /**
   * If the user uses Google Drive and this properties is specified, the file will be created in this directory. The currently user creating the file must be granted to write in this directory. 
   * @member {String} googleDriveFolder
   */
  exports.prototype['googleDriveFolder'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./ScoreData":76,"./ScoreDataEncoding":77,"./ScorePrivacy":83,"./ScoreSource":87}],75:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreCreationType = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';


  /**
   * Enum class ScoreCreationType.
   * @enum {}
   * @readonly
   */
  var exports = {
    /**
     * value: "original"
     * @const
     */
    "original": "original",
    /**
     * value: "arrangement"
     * @const
     */
    "arrangement": "arrangement",
    /**
     * value: "other"
     * @const
     */
    "other": "other"  };

  /**
   * Returns a <code>ScoreCreationType</code> enum value from a Javascript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
   * @return {module:model/ScoreCreationType} The enum <code>ScoreCreationType</code> value.
   */
  exports.constructFromObject = function(object) {
    return object;
  }

  return exports;
}));



},{"../ApiClient":16}],76:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreData = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ScoreData model module.
   * @module model/ScoreData
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreData</code>.
   * The data of the score file. It must be a MusicXML 3 file (&#x60;vnd.recordare.musicxml&#x60; or &#x60;vnd.recordare.musicxml+xml&#x60;), a MIDI file (&#x60;audio/midi&#x60;) or a Flat.json (aka Adagio.json) file.  Binary payloads (&#x60;vnd.recordare.musicxml&#x60; and &#x60;audio/midi&#x60;) can be encoded in Base64, in this case the &#x60;dataEncoding&#x60; property must match the encoding used for the API request. 
   * @alias module:model/ScoreData
   * @class
   */
  var exports = function() {
    var _this = this;

  };

  /**
   * Constructs a <code>ScoreData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreData} obj Optional instance to populate.
   * @return {module:model/ScoreData} The populated <code>ScoreData</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

    }
    return obj;
  }




  return exports;
}));



},{"../ApiClient":16}],77:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreDataEncoding = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';


  /**
   * Enum class ScoreDataEncoding.
   * @enum {}
   * @readonly
   */
  var exports = {
    /**
     * value: "base64"
     * @const
     */
    "base64": "base64"  };

  /**
   * Returns a <code>ScoreDataEncoding</code> enum value from a Javascript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
   * @return {module:model/ScoreDataEncoding} The enum <code>ScoreDataEncoding</code> value.
   */
  exports.constructFromObject = function(object) {
    return object;
  }

  return exports;
}));



},{"../ApiClient":16}],78:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ResourceCollaborator', 'model/ResourceRights', 'model/ScoreCommentsCounts', 'model/ScoreCreationType', 'model/ScoreLicense', 'model/ScoreLikesCounts', 'model/ScorePrivacy', 'model/ScoreSummary', 'model/ScoreViewsCounts', 'model/UserPublicSummary'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ResourceCollaborator'), require('./ResourceRights'), require('./ScoreCommentsCounts'), require('./ScoreCreationType'), require('./ScoreLicense'), require('./ScoreLikesCounts'), require('./ScorePrivacy'), require('./ScoreSummary'), require('./ScoreViewsCounts'), require('./UserPublicSummary'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreDetails = factory(root.FlatApi.ApiClient, root.FlatApi.ResourceCollaborator, root.FlatApi.ResourceRights, root.FlatApi.ScoreCommentsCounts, root.FlatApi.ScoreCreationType, root.FlatApi.ScoreLicense, root.FlatApi.ScoreLikesCounts, root.FlatApi.ScorePrivacy, root.FlatApi.ScoreSummary, root.FlatApi.ScoreViewsCounts, root.FlatApi.UserPublicSummary);
  }
}(this, function(ApiClient, ResourceCollaborator, ResourceRights, ScoreCommentsCounts, ScoreCreationType, ScoreLicense, ScoreLikesCounts, ScorePrivacy, ScoreSummary, ScoreViewsCounts, UserPublicSummary) {
  'use strict';




  /**
   * The ScoreDetails model module.
   * @module model/ScoreDetails
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreDetails</code>.
   * The score and all its details
   * @alias module:model/ScoreDetails
   * @class
   * @implements module:model/ScoreSummary
   */
  var exports = function() {
    var _this = this;

    ScoreSummary.call(_this);























  };

  /**
   * Constructs a <code>ScoreDetails</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreDetails} obj Optional instance to populate.
   * @return {module:model/ScoreDetails} The populated <code>ScoreDetails</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      ScoreSummary.constructFromObject(data, obj);
      if (data.hasOwnProperty('subtitle')) {
        obj['subtitle'] = ApiClient.convertToType(data['subtitle'], 'String');
      }
      if (data.hasOwnProperty('lyricist')) {
        obj['lyricist'] = ApiClient.convertToType(data['lyricist'], 'String');
      }
      if (data.hasOwnProperty('composer')) {
        obj['composer'] = ApiClient.convertToType(data['composer'], 'String');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('tags')) {
        obj['tags'] = ApiClient.convertToType(data['tags'], ['String']);
      }
      if (data.hasOwnProperty('creationType')) {
        obj['creationType'] = ScoreCreationType.constructFromObject(data['creationType']);
      }
      if (data.hasOwnProperty('license')) {
        obj['license'] = ScoreLicense.constructFromObject(data['license']);
      }
      if (data.hasOwnProperty('licenseText')) {
        obj['licenseText'] = ApiClient.convertToType(data['licenseText'], 'String');
      }
      if (data.hasOwnProperty('durationTime')) {
        obj['durationTime'] = ApiClient.convertToType(data['durationTime'], 'Number');
      }
      if (data.hasOwnProperty('numberMeasures')) {
        obj['numberMeasures'] = ApiClient.convertToType(data['numberMeasures'], 'Number');
      }
      if (data.hasOwnProperty('mainTempoQpm')) {
        obj['mainTempoQpm'] = ApiClient.convertToType(data['mainTempoQpm'], 'Number');
      }
      if (data.hasOwnProperty('rights')) {
        obj['rights'] = ResourceRights.constructFromObject(data['rights']);
      }
      if (data.hasOwnProperty('collaborators')) {
        obj['collaborators'] = ApiClient.convertToType(data['collaborators'], [ResourceCollaborator]);
      }
      if (data.hasOwnProperty('creationDate')) {
        obj['creationDate'] = ApiClient.convertToType(data['creationDate'], 'Date');
      }
      if (data.hasOwnProperty('modificationDate')) {
        obj['modificationDate'] = ApiClient.convertToType(data['modificationDate'], 'Date');
      }
      if (data.hasOwnProperty('publicationDate')) {
        obj['publicationDate'] = ApiClient.convertToType(data['publicationDate'], 'Date');
      }
      if (data.hasOwnProperty('organization')) {
        obj['organization'] = ApiClient.convertToType(data['organization'], 'String');
      }
      if (data.hasOwnProperty('parentScore')) {
        obj['parentScore'] = ApiClient.convertToType(data['parentScore'], 'String');
      }
      if (data.hasOwnProperty('instruments')) {
        obj['instruments'] = ApiClient.convertToType(data['instruments'], ['String']);
      }
      if (data.hasOwnProperty('googleDriveFileId')) {
        obj['googleDriveFileId'] = ApiClient.convertToType(data['googleDriveFileId'], 'String');
      }
      if (data.hasOwnProperty('likes')) {
        obj['likes'] = ScoreLikesCounts.constructFromObject(data['likes']);
      }
      if (data.hasOwnProperty('comments')) {
        obj['comments'] = ScoreCommentsCounts.constructFromObject(data['comments']);
      }
      if (data.hasOwnProperty('views')) {
        obj['views'] = ScoreViewsCounts.constructFromObject(data['views']);
      }
    }
    return obj;
  }

  /**
   * Subtitle of the score
   * @member {String} subtitle
   */
  exports.prototype['subtitle'] = undefined;
  /**
   * Lyricist of the score
   * @member {String} lyricist
   */
  exports.prototype['lyricist'] = undefined;
  /**
   * Composer of the score
   * @member {String} composer
   */
  exports.prototype['composer'] = undefined;
  /**
   * Description of the creation
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * Tags describing the score
   * @member {Array.<String>} tags
   */
  exports.prototype['tags'] = undefined;
  /**
   * @member {module:model/ScoreCreationType} creationType
   */
  exports.prototype['creationType'] = undefined;
  /**
   * @member {module:model/ScoreLicense} license
   */
  exports.prototype['license'] = undefined;
  /**
   * Additional license text written on the exported/printed score
   * @member {String} licenseText
   */
  exports.prototype['licenseText'] = undefined;
  /**
   * In seconds, an approximative duration of the score
   * @member {Number} durationTime
   */
  exports.prototype['durationTime'] = undefined;
  /**
   * The number of measures in the score
   * @member {Number} numberMeasures
   */
  exports.prototype['numberMeasures'] = undefined;
  /**
   * The main tempo of the score (in QPM)
   * @member {Number} mainTempoQpm
   */
  exports.prototype['mainTempoQpm'] = undefined;
  /**
   * @member {module:model/ResourceRights} rights
   */
  exports.prototype['rights'] = undefined;
  /**
   * The list of the collaborators of the score
   * @member {Array.<module:model/ResourceCollaborator>} collaborators
   */
  exports.prototype['collaborators'] = undefined;
  /**
   * The date when the score was created
   * @member {Date} creationDate
   */
  exports.prototype['creationDate'] = undefined;
  /**
   * The date of the last revision of the score
   * @member {Date} modificationDate
   */
  exports.prototype['modificationDate'] = undefined;
  /**
   * The date when the score was published on Flat
   * @member {Date} publicationDate
   */
  exports.prototype['publicationDate'] = undefined;
  /**
   * If the score has been created in an organization, the identifier of this organization. This property is especially used with the score privacy `organizationPublic`. 
   * @member {String} organization
   */
  exports.prototype['organization'] = undefined;
  /**
   * If the score has been forked, the unique identifier of the parent score. 
   * @member {String} parentScore
   */
  exports.prototype['parentScore'] = undefined;
  /**
   * An array of the instrument identifiers used in the last version of the score. This is mainly used to display a list of the instruments in the Flat's UI or instruments icons. The format of the strings is `{instrument-group}.{instrument-id}`. 
   * @member {Array.<String>} instruments
   */
  exports.prototype['instruments'] = undefined;
  /**
   * If the user uses Google Drive and the score exists on Google Drive, this field will contain the unique identifier of the Flat score on Google Drive. You can access the document using the url: `https://drive.google.com/open?id={googleDriveFileId}` 
   * @member {String} googleDriveFileId
   */
  exports.prototype['googleDriveFileId'] = undefined;
  /**
   * @member {module:model/ScoreLikesCounts} likes
   */
  exports.prototype['likes'] = undefined;
  /**
   * @member {module:model/ScoreCommentsCounts} comments
   */
  exports.prototype['comments'] = undefined;
  /**
   * @member {module:model/ScoreViewsCounts} views
   */
  exports.prototype['views'] = undefined;

  // Implement ScoreSummary interface:
  /**
   * The unique identifier of the score
   * @member {String} id
   */
exports.prototype['id'] = undefined;

  /**
   * The private sharing key of the score (available when the `privacy` mode is set to `privateLink`)
   * @member {String} sharingKey
   */
exports.prototype['sharingKey'] = undefined;

  /**
   * The title of the score
   * @member {String} title
   */
exports.prototype['title'] = undefined;

  /**
   * @member {module:model/ScorePrivacy} privacy
   */
exports.prototype['privacy'] = undefined;

  /**
   * @member {module:model/UserPublicSummary} user
   */
exports.prototype['user'] = undefined;

  /**
   * The url where the score can be viewed in a web browser
   * @member {String} htmlUrl
   */
exports.prototype['htmlUrl'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./ResourceCollaborator":65,"./ResourceRights":67,"./ScoreCommentsCounts":73,"./ScoreCreationType":75,"./ScoreLicense":80,"./ScoreLikesCounts":81,"./ScorePrivacy":83,"./ScoreSummary":88,"./ScoreViewsCounts":95,"./UserPublicSummary":104}],79:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreFork = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ScoreFork model module.
   * @module model/ScoreFork
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreFork</code>.
   * Options to fork the score
   * @alias module:model/ScoreFork
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>ScoreFork</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreFork} obj Optional instance to populate.
   * @return {module:model/ScoreFork} The populated <code>ScoreFork</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('collection')) {
        obj['collection'] = ApiClient.convertToType(data['collection'], 'String');
      }
    }
    return obj;
  }

  /**
   * Unique identifier of a collection where the score will be copied. If no collection identifier is provided, the score will be stored in the `root` directory. 
   * @member {String} collection
   */
  exports.prototype['collection'] = undefined;



  return exports;
}));



},{"../ApiClient":16}],80:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreLicense = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';


  /**
   * Enum class ScoreLicense.
   * @enum {}
   * @readonly
   */
  var exports = {
    /**
     * value: "copyright"
     * @const
     */
    "copyright": "copyright",
    /**
     * value: "cc0"
     * @const
     */
    "cc0": "cc0",
    /**
     * value: "cc-by"
     * @const
     */
    "cc-by": "cc-by",
    /**
     * value: "cc-by-sa"
     * @const
     */
    "cc-by-sa": "cc-by-sa",
    /**
     * value: "cc-by-nd"
     * @const
     */
    "cc-by-nd": "cc-by-nd",
    /**
     * value: "cc-by-nc"
     * @const
     */
    "cc-by-nc": "cc-by-nc",
    /**
     * value: "cc-by-nc-sa"
     * @const
     */
    "cc-by-nc-sa": "cc-by-nc-sa",
    /**
     * value: "cc-by-nc-nd"
     * @const
     */
    "cc-by-nc-nd": "cc-by-nc-nd"  };

  /**
   * Returns a <code>ScoreLicense</code> enum value from a Javascript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
   * @return {module:model/ScoreLicense} The enum <code>ScoreLicense</code> value.
   */
  exports.constructFromObject = function(object) {
    return object;
  }

  return exports;
}));



},{"../ApiClient":16}],81:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreLikesCounts = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ScoreLikesCounts model module.
   * @module model/ScoreLikesCounts
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreLikesCounts</code>.
   * A computed version of the weekly, monthly and total of number of likes for a score 
   * @alias module:model/ScoreLikesCounts
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>ScoreLikesCounts</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreLikesCounts} obj Optional instance to populate.
   * @return {module:model/ScoreLikesCounts} The populated <code>ScoreLikesCounts</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
      if (data.hasOwnProperty('weekly')) {
        obj['weekly'] = ApiClient.convertToType(data['weekly'], 'Number');
      }
      if (data.hasOwnProperty('monthly')) {
        obj['monthly'] = ApiClient.convertToType(data['monthly'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The total number of likes of the score
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;
  /**
   * The number of new likes during the last week
   * @member {Number} weekly
   */
  exports.prototype['weekly'] = undefined;
  /**
   * The number of new likes during the last month
   * @member {Number} monthly
   */
  exports.prototype['monthly'] = undefined;



  return exports;
}));



},{"../ApiClient":16}],82:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ResourceSharingKey', 'model/ScoreCreationType', 'model/ScoreLicense', 'model/ScorePrivacy'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ResourceSharingKey'), require('./ScoreCreationType'), require('./ScoreLicense'), require('./ScorePrivacy'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreModification = factory(root.FlatApi.ApiClient, root.FlatApi.ResourceSharingKey, root.FlatApi.ScoreCreationType, root.FlatApi.ScoreLicense, root.FlatApi.ScorePrivacy);
  }
}(this, function(ApiClient, ResourceSharingKey, ScoreCreationType, ScoreLicense, ScorePrivacy) {
  'use strict';




  /**
   * The ScoreModification model module.
   * @module model/ScoreModification
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreModification</code>.
   * Edit the score metadata
   * @alias module:model/ScoreModification
   * @class
   */
  var exports = function() {
    var _this = this;








  };

  /**
   * Constructs a <code>ScoreModification</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreModification} obj Optional instance to populate.
   * @return {module:model/ScoreModification} The populated <code>ScoreModification</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('privacy')) {
        obj['privacy'] = ScorePrivacy.constructFromObject(data['privacy']);
      }
      if (data.hasOwnProperty('sharingKey')) {
        obj['sharingKey'] = ResourceSharingKey.constructFromObject(data['sharingKey']);
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('tags')) {
        obj['tags'] = ApiClient.convertToType(data['tags'], ['String']);
      }
      if (data.hasOwnProperty('creationType')) {
        obj['creationType'] = ScoreCreationType.constructFromObject(data['creationType']);
      }
      if (data.hasOwnProperty('license')) {
        obj['license'] = ScoreLicense.constructFromObject(data['license']);
      }
    }
    return obj;
  }

  /**
   * The title of the score
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * @member {module:model/ScorePrivacy} privacy
   */
  exports.prototype['privacy'] = undefined;
  /**
   * @member {module:model/ResourceSharingKey} sharingKey
   */
  exports.prototype['sharingKey'] = undefined;
  /**
   * Description of the creation
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * Tags describing the score
   * @member {Array.<String>} tags
   */
  exports.prototype['tags'] = undefined;
  /**
   * @member {module:model/ScoreCreationType} creationType
   */
  exports.prototype['creationType'] = undefined;
  /**
   * @member {module:model/ScoreLicense} license
   */
  exports.prototype['license'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./ResourceSharingKey":68,"./ScoreCreationType":75,"./ScoreLicense":80,"./ScorePrivacy":83}],83:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScorePrivacy = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';


  /**
   * Enum class ScorePrivacy.
   * @enum {}
   * @readonly
   */
  var exports = {
    /**
     * value: "public"
     * @const
     */
    "public": "public",
    /**
     * value: "private"
     * @const
     */
    "private": "private",
    /**
     * value: "organizationPublic"
     * @const
     */
    "organizationPublic": "organizationPublic",
    /**
     * value: "privateLink"
     * @const
     */
    "privateLink": "privateLink"  };

  /**
   * Returns a <code>ScorePrivacy</code> enum value from a Javascript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
   * @return {module:model/ScorePrivacy} The enum <code>ScorePrivacy</code> value.
   */
  exports.constructFromObject = function(object) {
    return object;
  }

  return exports;
}));



},{"../ApiClient":16}],84:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ScoreRevisionStatistics'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ScoreRevisionStatistics'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreRevision = factory(root.FlatApi.ApiClient, root.FlatApi.ScoreRevisionStatistics);
  }
}(this, function(ApiClient, ScoreRevisionStatistics) {
  'use strict';




  /**
   * The ScoreRevision model module.
   * @module model/ScoreRevision
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreRevision</code>.
   * A score revision metadata
   * @alias module:model/ScoreRevision
   * @class
   */
  var exports = function() {
    var _this = this;








  };

  /**
   * Constructs a <code>ScoreRevision</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreRevision} obj Optional instance to populate.
   * @return {module:model/ScoreRevision} The populated <code>ScoreRevision</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('user')) {
        obj['user'] = ApiClient.convertToType(data['user'], 'String');
      }
      if (data.hasOwnProperty('collaborators')) {
        obj['collaborators'] = ApiClient.convertToType(data['collaborators'], ['String']);
      }
      if (data.hasOwnProperty('creationDate')) {
        obj['creationDate'] = ApiClient.convertToType(data['creationDate'], 'Date');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('autosave')) {
        obj['autosave'] = ApiClient.convertToType(data['autosave'], 'Boolean');
      }
      if (data.hasOwnProperty('statistics')) {
        obj['statistics'] = ScoreRevisionStatistics.constructFromObject(data['statistics']);
      }
    }
    return obj;
  }

  /**
   * The unique identifier of the revision.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The user identifier who created the revision
   * @member {String} user
   */
  exports.prototype['user'] = undefined;
  /**
   * @member {Array.<String>} collaborators
   */
  exports.prototype['collaborators'] = undefined;
  /**
   * The date when this revision was created
   * @member {Date} creationDate
   */
  exports.prototype['creationDate'] = undefined;
  /**
   * A description associated to the revision
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * True if this revision was automatically generated by Flat and not on purpose by the user. 
   * @member {Boolean} autosave
   */
  exports.prototype['autosave'] = undefined;
  /**
   * @member {module:model/ScoreRevisionStatistics} statistics
   */
  exports.prototype['statistics'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./ScoreRevisionStatistics":86}],85:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ScoreData', 'model/ScoreDataEncoding'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ScoreData'), require('./ScoreDataEncoding'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreRevisionCreation = factory(root.FlatApi.ApiClient, root.FlatApi.ScoreData, root.FlatApi.ScoreDataEncoding);
  }
}(this, function(ApiClient, ScoreData, ScoreDataEncoding) {
  'use strict';




  /**
   * The ScoreRevisionCreation model module.
   * @module model/ScoreRevisionCreation
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreRevisionCreation</code>.
   * A new created revision
   * @alias module:model/ScoreRevisionCreation
   * @class
   * @param data {module:model/ScoreData} 
   */
  var exports = function(data) {
    var _this = this;

    _this['data'] = data;



  };

  /**
   * Constructs a <code>ScoreRevisionCreation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreRevisionCreation} obj Optional instance to populate.
   * @return {module:model/ScoreRevisionCreation} The populated <code>ScoreRevisionCreation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = ScoreData.constructFromObject(data['data']);
      }
      if (data.hasOwnProperty('dataEncoding')) {
        obj['dataEncoding'] = ScoreDataEncoding.constructFromObject(data['dataEncoding']);
      }
      if (data.hasOwnProperty('autosave')) {
        obj['autosave'] = ApiClient.convertToType(data['autosave'], 'Boolean');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {module:model/ScoreData} data
   */
  exports.prototype['data'] = undefined;
  /**
   * @member {module:model/ScoreDataEncoding} dataEncoding
   */
  exports.prototype['dataEncoding'] = undefined;
  /**
   * Must be set to `true` if the revision was created automatically. 
   * @member {Boolean} autosave
   */
  exports.prototype['autosave'] = undefined;
  /**
   * A description associated to the revision
   * @member {String} description
   */
  exports.prototype['description'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./ScoreData":76,"./ScoreDataEncoding":77}],86:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreRevisionStatistics = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ScoreRevisionStatistics model module.
   * @module model/ScoreRevisionStatistics
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreRevisionStatistics</code>.
   * The statistics related to the score revision (additions and deletions) 
   * @alias module:model/ScoreRevisionStatistics
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>ScoreRevisionStatistics</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreRevisionStatistics} obj Optional instance to populate.
   * @return {module:model/ScoreRevisionStatistics} The populated <code>ScoreRevisionStatistics</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('additions')) {
        obj['additions'] = ApiClient.convertToType(data['additions'], 'Number');
      }
      if (data.hasOwnProperty('deletions')) {
        obj['deletions'] = ApiClient.convertToType(data['deletions'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The number of additions operations in the last revision
   * @member {Number} additions
   */
  exports.prototype['additions'] = undefined;
  /**
   * The number of deletions operations in the last revision
   * @member {Number} deletions
   */
  exports.prototype['deletions'] = undefined;



  return exports;
}));



},{"../ApiClient":16}],87:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreSource = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ScoreSource model module.
   * @module model/ScoreSource
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreSource</code>.
   * @alias module:model/ScoreSource
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>ScoreSource</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreSource} obj Optional instance to populate.
   * @return {module:model/ScoreSource} The populated <code>ScoreSource</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('googleDrive')) {
        obj['googleDrive'] = ApiClient.convertToType(data['googleDrive'], 'String');
      }
    }
    return obj;
  }

  /**
   * If the score is a file on Google Drive, this field property must contain its identifier. To use this method, the Drive file must be public or the Flat Drive App must have access to the file. 
   * @member {String} googleDrive
   */
  exports.prototype['googleDrive'] = undefined;



  return exports;
}));



},{"../ApiClient":16}],88:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ScorePrivacy', 'model/UserPublicSummary'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ScorePrivacy'), require('./UserPublicSummary'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreSummary = factory(root.FlatApi.ApiClient, root.FlatApi.ScorePrivacy, root.FlatApi.UserPublicSummary);
  }
}(this, function(ApiClient, ScorePrivacy, UserPublicSummary) {
  'use strict';




  /**
   * The ScoreSummary model module.
   * @module model/ScoreSummary
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreSummary</code>.
   * A summary of the score details
   * @alias module:model/ScoreSummary
   * @class
   */
  var exports = function() {
    var _this = this;







  };

  /**
   * Constructs a <code>ScoreSummary</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreSummary} obj Optional instance to populate.
   * @return {module:model/ScoreSummary} The populated <code>ScoreSummary</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('sharingKey')) {
        obj['sharingKey'] = ApiClient.convertToType(data['sharingKey'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('privacy')) {
        obj['privacy'] = ScorePrivacy.constructFromObject(data['privacy']);
      }
      if (data.hasOwnProperty('user')) {
        obj['user'] = UserPublicSummary.constructFromObject(data['user']);
      }
      if (data.hasOwnProperty('htmlUrl')) {
        obj['htmlUrl'] = ApiClient.convertToType(data['htmlUrl'], 'String');
      }
    }
    return obj;
  }

  /**
   * The unique identifier of the score
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The private sharing key of the score (available when the `privacy` mode is set to `privateLink`)
   * @member {String} sharingKey
   */
  exports.prototype['sharingKey'] = undefined;
  /**
   * The title of the score
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * @member {module:model/ScorePrivacy} privacy
   */
  exports.prototype['privacy'] = undefined;
  /**
   * @member {module:model/UserPublicSummary} user
   */
  exports.prototype['user'] = undefined;
  /**
   * The url where the score can be viewed in a web browser
   * @member {String} htmlUrl
   */
  exports.prototype['htmlUrl'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./ScorePrivacy":83,"./UserPublicSummary":104}],89:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ScoreTrackPoint', 'model/ScoreTrackState', 'model/ScoreTrackType'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ScoreTrackPoint'), require('./ScoreTrackState'), require('./ScoreTrackType'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreTrack = factory(root.FlatApi.ApiClient, root.FlatApi.ScoreTrackPoint, root.FlatApi.ScoreTrackState, root.FlatApi.ScoreTrackType);
  }
}(this, function(ApiClient, ScoreTrackPoint, ScoreTrackState, ScoreTrackType) {
  'use strict';




  /**
   * The ScoreTrack model module.
   * @module model/ScoreTrack
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreTrack</code>.
   * An audio track for a score
   * @alias module:model/ScoreTrack
   * @class
   */
  var exports = function() {
    var _this = this;













  };

  /**
   * Constructs a <code>ScoreTrack</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreTrack} obj Optional instance to populate.
   * @return {module:model/ScoreTrack} The populated <code>ScoreTrack</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('score')) {
        obj['score'] = ApiClient.convertToType(data['score'], 'String');
      }
      if (data.hasOwnProperty('creator')) {
        obj['creator'] = ApiClient.convertToType(data['creator'], 'String');
      }
      if (data.hasOwnProperty('creationDate')) {
        obj['creationDate'] = ApiClient.convertToType(data['creationDate'], 'Date');
      }
      if (data.hasOwnProperty('modificationDate')) {
        obj['modificationDate'] = ApiClient.convertToType(data['modificationDate'], 'Date');
      }
      if (data.hasOwnProperty('default')) {
        obj['default'] = ApiClient.convertToType(data['default'], 'Boolean');
      }
      if (data.hasOwnProperty('state')) {
        obj['state'] = ScoreTrackState.constructFromObject(data['state']);
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ScoreTrackType.constructFromObject(data['type']);
      }
      if (data.hasOwnProperty('url')) {
        obj['url'] = ApiClient.convertToType(data['url'], 'String');
      }
      if (data.hasOwnProperty('mediaId')) {
        obj['mediaId'] = ApiClient.convertToType(data['mediaId'], 'String');
      }
      if (data.hasOwnProperty('synchronizationPoints')) {
        obj['synchronizationPoints'] = ApiClient.convertToType(data['synchronizationPoints'], [ScoreTrackPoint]);
      }
    }
    return obj;
  }

  /**
   * The unique identifier of the score track
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Title of the track
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * The unique identifier of the score
   * @member {String} score
   */
  exports.prototype['score'] = undefined;
  /**
   * The unique identifier of the track creator
   * @member {String} creator
   */
  exports.prototype['creator'] = undefined;
  /**
   * The creation date of the track
   * @member {Date} creationDate
   */
  exports.prototype['creationDate'] = undefined;
  /**
   * The modification date of the track
   * @member {Date} modificationDate
   */
  exports.prototype['modificationDate'] = undefined;
  /**
   * True if the track should be used as default audio source
   * @member {Boolean} default
   */
  exports.prototype['default'] = undefined;
  /**
   * @member {module:model/ScoreTrackState} state
   */
  exports.prototype['state'] = undefined;
  /**
   * @member {module:model/ScoreTrackType} type
   */
  exports.prototype['type'] = undefined;
  /**
   * The URL of the track
   * @member {String} url
   */
  exports.prototype['url'] = undefined;
  /**
   * The unique identifier of the track when hosted on an external service. For example, if the url is `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, `mediaId` will be `dQw4w9WgXcQ` 
   * @member {String} mediaId
   */
  exports.prototype['mediaId'] = undefined;
  /**
   * @member {Array.<module:model/ScoreTrackPoint>} synchronizationPoints
   */
  exports.prototype['synchronizationPoints'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./ScoreTrackPoint":91,"./ScoreTrackState":92,"./ScoreTrackType":93}],90:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ScoreTrackPoint', 'model/ScoreTrackState'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ScoreTrackPoint'), require('./ScoreTrackState'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreTrackCreation = factory(root.FlatApi.ApiClient, root.FlatApi.ScoreTrackPoint, root.FlatApi.ScoreTrackState);
  }
}(this, function(ApiClient, ScoreTrackPoint, ScoreTrackState) {
  'use strict';




  /**
   * The ScoreTrackCreation model module.
   * @module model/ScoreTrackCreation
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreTrackCreation</code>.
   * Creation of a new track. This one must contain the URL of the track or the corresponding file 
   * @alias module:model/ScoreTrackCreation
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>ScoreTrackCreation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreTrackCreation} obj Optional instance to populate.
   * @return {module:model/ScoreTrackCreation} The populated <code>ScoreTrackCreation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('default')) {
        obj['default'] = ApiClient.convertToType(data['default'], 'Boolean');
      }
      if (data.hasOwnProperty('state')) {
        obj['state'] = ScoreTrackState.constructFromObject(data['state']);
      }
      if (data.hasOwnProperty('url')) {
        obj['url'] = ApiClient.convertToType(data['url'], 'String');
      }
      if (data.hasOwnProperty('synchronizationPoints')) {
        obj['synchronizationPoints'] = ApiClient.convertToType(data['synchronizationPoints'], [ScoreTrackPoint]);
      }
    }
    return obj;
  }

  /**
   * Title of the track
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * True if the track should be used as default audio source
   * @member {Boolean} default
   */
  exports.prototype['default'] = undefined;
  /**
   * @member {module:model/ScoreTrackState} state
   */
  exports.prototype['state'] = undefined;
  /**
   * The URL of the track
   * @member {String} url
   */
  exports.prototype['url'] = undefined;
  /**
   * @member {Array.<module:model/ScoreTrackPoint>} synchronizationPoints
   */
  exports.prototype['synchronizationPoints'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./ScoreTrackPoint":91,"./ScoreTrackState":92}],91:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreTrackPoint = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ScoreTrackPoint model module.
   * @module model/ScoreTrackPoint
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreTrackPoint</code>.
   * A track synchronization point
   * @alias module:model/ScoreTrackPoint
   * @class
   * @param type {module:model/ScoreTrackPoint.TypeEnum} The type of the synchronization point. If the type is `measure`, the measure uuid must be present in `measureUuid`
   * @param time {Number} The corresponding time in seconds
   */
  var exports = function(type, time) {
    var _this = this;

    _this['type'] = type;

    _this['time'] = time;
  };

  /**
   * Constructs a <code>ScoreTrackPoint</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreTrackPoint} obj Optional instance to populate.
   * @return {module:model/ScoreTrackPoint} The populated <code>ScoreTrackPoint</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('measureUuid')) {
        obj['measureUuid'] = ApiClient.convertToType(data['measureUuid'], 'String');
      }
      if (data.hasOwnProperty('time')) {
        obj['time'] = ApiClient.convertToType(data['time'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The type of the synchronization point. If the type is `measure`, the measure uuid must be present in `measureUuid`
   * @member {module:model/ScoreTrackPoint.TypeEnum} type
   */
  exports.prototype['type'] = undefined;
  /**
   * The measure unique identifier
   * @member {String} measureUuid
   */
  exports.prototype['measureUuid'] = undefined;
  /**
   * The corresponding time in seconds
   * @member {Number} time
   */
  exports.prototype['time'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "measure"
     * @const
     */
    "measure": "measure",
    /**
     * value: "end"
     * @const
     */
    "end": "end"  };


  return exports;
}));



},{"../ApiClient":16}],92:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreTrackState = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';


  /**
   * Enum class ScoreTrackState.
   * @enum {}
   * @readonly
   */
  var exports = {
    /**
     * value: "draft"
     * @const
     */
    "draft": "draft",
    /**
     * value: "completed"
     * @const
     */
    "completed": "completed",
    /**
     * value: "deleted"
     * @const
     */
    "deleted": "deleted"  };

  /**
   * Returns a <code>ScoreTrackState</code> enum value from a Javascript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
   * @return {module:model/ScoreTrackState} The enum <code>ScoreTrackState</code> value.
   */
  exports.constructFromObject = function(object) {
    return object;
  }

  return exports;
}));



},{"../ApiClient":16}],93:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreTrackType = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';


  /**
   * Enum class ScoreTrackType.
   * @enum {}
   * @readonly
   */
  var exports = {
    /**
     * value: "audio"
     * @const
     */
    "audio": "audio",
    /**
     * value: "soundcloud"
     * @const
     */
    "soundcloud": "soundcloud",
    /**
     * value: "youtube"
     * @const
     */
    "youtube": "youtube",
    /**
     * value: "vimeo"
     * @const
     */
    "vimeo": "vimeo"  };

  /**
   * Returns a <code>ScoreTrackType</code> enum value from a Javascript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
   * @return {module:model/ScoreTrackType} The enum <code>ScoreTrackType</code> value.
   */
  exports.constructFromObject = function(object) {
    return object;
  }

  return exports;
}));



},{"../ApiClient":16}],94:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ScoreTrackPoint', 'model/ScoreTrackState'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ScoreTrackPoint'), require('./ScoreTrackState'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreTrackUpdate = factory(root.FlatApi.ApiClient, root.FlatApi.ScoreTrackPoint, root.FlatApi.ScoreTrackState);
  }
}(this, function(ApiClient, ScoreTrackPoint, ScoreTrackState) {
  'use strict';




  /**
   * The ScoreTrackUpdate model module.
   * @module model/ScoreTrackUpdate
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreTrackUpdate</code>.
   * Update an existing track. 
   * @alias module:model/ScoreTrackUpdate
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>ScoreTrackUpdate</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreTrackUpdate} obj Optional instance to populate.
   * @return {module:model/ScoreTrackUpdate} The populated <code>ScoreTrackUpdate</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('default')) {
        obj['default'] = ApiClient.convertToType(data['default'], 'Boolean');
      }
      if (data.hasOwnProperty('state')) {
        obj['state'] = ScoreTrackState.constructFromObject(data['state']);
      }
      if (data.hasOwnProperty('synchronizationPoints')) {
        obj['synchronizationPoints'] = ApiClient.convertToType(data['synchronizationPoints'], [ScoreTrackPoint]);
      }
    }
    return obj;
  }

  /**
   * Title of the track
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * True if the track should be used as default audio source
   * @member {Boolean} default
   */
  exports.prototype['default'] = undefined;
  /**
   * @member {module:model/ScoreTrackState} state
   */
  exports.prototype['state'] = undefined;
  /**
   * @member {Array.<module:model/ScoreTrackPoint>} synchronizationPoints
   */
  exports.prototype['synchronizationPoints'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./ScoreTrackPoint":91,"./ScoreTrackState":92}],95:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreViewsCounts = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ScoreViewsCounts model module.
   * @module model/ScoreViewsCounts
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ScoreViewsCounts</code>.
   * A computed version of the total, weekly, and monthly number of views of the score 
   * @alias module:model/ScoreViewsCounts
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>ScoreViewsCounts</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreViewsCounts} obj Optional instance to populate.
   * @return {module:model/ScoreViewsCounts} The populated <code>ScoreViewsCounts</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
      if (data.hasOwnProperty('weekly')) {
        obj['weekly'] = ApiClient.convertToType(data['weekly'], 'Number');
      }
      if (data.hasOwnProperty('monthly')) {
        obj['monthly'] = ApiClient.convertToType(data['monthly'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The total number of views of the score
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;
  /**
   * The weekly number of views of the score
   * @member {Number} weekly
   */
  exports.prototype['weekly'] = undefined;
  /**
   * The monthly number of views of the score
   * @member {Number} monthly
   */
  exports.prototype['monthly'] = undefined;



  return exports;
}));



},{"../ApiClient":16}],96:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/OrganizationRoles'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./OrganizationRoles'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.UserAdminUpdate = factory(root.FlatApi.ApiClient, root.FlatApi.OrganizationRoles);
  }
}(this, function(ApiClient, OrganizationRoles) {
  'use strict';




  /**
   * The UserAdminUpdate model module.
   * @module model/UserAdminUpdate
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>UserAdminUpdate</code>.
   * User update as an organization admin
   * @alias module:model/UserAdminUpdate
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>UserAdminUpdate</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserAdminUpdate} obj Optional instance to populate.
   * @return {module:model/UserAdminUpdate} The populated <code>UserAdminUpdate</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('password')) {
        obj['password'] = ApiClient.convertToType(data['password'], 'String');
      }
      if (data.hasOwnProperty('organizationRole')) {
        obj['organizationRole'] = OrganizationRoles.constructFromObject(data['organizationRole']);
      }
    }
    return obj;
  }

  /**
   * Password of the new account
   * @member {String} password
   */
  exports.prototype['password'] = undefined;
  /**
   * @member {module:model/OrganizationRoles} organizationRole
   */
  exports.prototype['organizationRole'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./OrganizationRoles":64}],97:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.UserBasics = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The UserBasics model module.
   * @module model/UserBasics
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>UserBasics</code>.
   * @alias module:model/UserBasics
   * @class
   */
  var exports = function() {
    var _this = this;







  };

  /**
   * Constructs a <code>UserBasics</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserBasics} obj Optional instance to populate.
   * @return {module:model/UserBasics} The populated <code>UserBasics</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('username')) {
        obj['username'] = ApiClient.convertToType(data['username'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('printableName')) {
        obj['printableName'] = ApiClient.convertToType(data['printableName'], 'String');
      }
      if (data.hasOwnProperty('picture')) {
        obj['picture'] = ApiClient.convertToType(data['picture'], 'String');
      }
      if (data.hasOwnProperty('isPowerUser')) {
        obj['isPowerUser'] = ApiClient.convertToType(data['isPowerUser'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * The user unique identifier
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The user name (unique for the organization)
   * @member {String} username
   */
  exports.prototype['username'] = undefined;
  /**
   * A displayable name for the user
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The name that can be directly printed (name or username)
   * @member {String} printableName
   */
  exports.prototype['printableName'] = undefined;
  /**
   * User pictue
   * @member {String} picture
   */
  exports.prototype['picture'] = undefined;
  /**
   * User license status. 'True' if user is an individual Power user
   * @member {Boolean} isPowerUser
   */
  exports.prototype['isPowerUser'] = undefined;



  return exports;
}));



},{"../ApiClient":16}],98:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/FlatLocales'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./FlatLocales'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.UserCreation = factory(root.FlatApi.ApiClient, root.FlatApi.FlatLocales);
  }
}(this, function(ApiClient, FlatLocales) {
  'use strict';




  /**
   * The UserCreation model module.
   * @module model/UserCreation
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>UserCreation</code>.
   * User creation
   * @alias module:model/UserCreation
   * @class
   * @param username {String} Username of the new account
   * @param password {String} Password of the new account
   */
  var exports = function(username, password) {
    var _this = this;

    _this['username'] = username;

    _this['password'] = password;

  };

  /**
   * Constructs a <code>UserCreation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserCreation} obj Optional instance to populate.
   * @return {module:model/UserCreation} The populated <code>UserCreation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('username')) {
        obj['username'] = ApiClient.convertToType(data['username'], 'String');
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('password')) {
        obj['password'] = ApiClient.convertToType(data['password'], 'String');
      }
      if (data.hasOwnProperty('locale')) {
        obj['locale'] = FlatLocales.constructFromObject(data['locale']);
      }
    }
    return obj;
  }

  /**
   * Username of the new account
   * @member {String} username
   */
  exports.prototype['username'] = undefined;
  /**
   * Email of the new account
   * @member {String} email
   */
  exports.prototype['email'] = undefined;
  /**
   * Password of the new account
   * @member {String} password
   */
  exports.prototype['password'] = undefined;
  /**
   * @member {module:model/FlatLocales} locale
   */
  exports.prototype['locale'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./FlatLocales":49}],99:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ClassRoles', 'model/FlatLocales', 'model/OrganizationRoles', 'model/UserInstruments', 'model/UserPublic'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ClassRoles'), require('./FlatLocales'), require('./OrganizationRoles'), require('./UserInstruments'), require('./UserPublic'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.UserDetails = factory(root.FlatApi.ApiClient, root.FlatApi.ClassRoles, root.FlatApi.FlatLocales, root.FlatApi.OrganizationRoles, root.FlatApi.UserInstruments, root.FlatApi.UserPublic);
  }
}(this, function(ApiClient, ClassRoles, FlatLocales, OrganizationRoles, UserInstruments, UserPublic) {
  'use strict';




  /**
   * The UserDetails model module.
   * @module model/UserDetails
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>UserDetails</code>.
   * User details
   * @alias module:model/UserDetails
   * @class
   * @extends module:model/UserPublic
   */
  var exports = function() {
    var _this = this;
    UserPublic.call(_this);




  };

  /**
   * Constructs a <code>UserDetails</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserDetails} obj Optional instance to populate.
   * @return {module:model/UserDetails} The populated <code>UserDetails</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      UserPublic.constructFromObject(data, obj);
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('privateProfile')) {
        obj['privateProfile'] = ApiClient.convertToType(data['privateProfile'], 'Boolean');
      }
      if (data.hasOwnProperty('locale')) {
        obj['locale'] = FlatLocales.constructFromObject(data['locale']);
      }
    }
    return obj;
  }

  exports.prototype = Object.create(UserPublic.prototype);
  exports.prototype.constructor = exports;

  /**
   * Identifier of the user
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The type of account
   * @member {module:model/UserDetails.TypeEnum} type
   */
  exports.prototype['type'] = undefined;
  /**
   * Tell either this user profile is private or not (individual accounts only)
   * @member {Boolean} privateProfile
   */
  exports.prototype['privateProfile'] = undefined;
  /**
   * @member {module:model/FlatLocales} locale
   */
  exports.prototype['locale'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "user"
     * @const
     */
    "user": "user",
    /**
     * value: "guest"
     * @const
     */
    "guest": "guest"  };


  return exports;
}));



},{"../ApiClient":16,"./ClassRoles":38,"./FlatLocales":49,"./OrganizationRoles":64,"./UserInstruments":102,"./UserPublic":103}],100:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ClassRoles', 'model/OrganizationRoles', 'model/UserDetailsAdminLicense', 'model/UserPublicSummary'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ClassRoles'), require('./OrganizationRoles'), require('./UserDetailsAdminLicense'), require('./UserPublicSummary'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.UserDetailsAdmin = factory(root.FlatApi.ApiClient, root.FlatApi.ClassRoles, root.FlatApi.OrganizationRoles, root.FlatApi.UserDetailsAdminLicense, root.FlatApi.UserPublicSummary);
  }
}(this, function(ApiClient, ClassRoles, OrganizationRoles, UserDetailsAdminLicense, UserPublicSummary) {
  'use strict';




  /**
   * The UserDetailsAdmin model module.
   * @module model/UserDetailsAdmin
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>UserDetailsAdmin</code>.
   * User details (view for organization teacher / admin)
   * @alias module:model/UserDetailsAdmin
   * @class
   * @extends module:model/UserPublicSummary
   */
  var exports = function() {
    var _this = this;
    UserPublicSummary.call(_this);



  };

  /**
   * Constructs a <code>UserDetailsAdmin</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserDetailsAdmin} obj Optional instance to populate.
   * @return {module:model/UserDetailsAdmin} The populated <code>UserDetailsAdmin</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      UserPublicSummary.constructFromObject(data, obj);
      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('lastActivityDate')) {
        obj['lastActivityDate'] = ApiClient.convertToType(data['lastActivityDate'], 'Date');
      }
      if (data.hasOwnProperty('license')) {
        obj['license'] = UserDetailsAdminLicense.constructFromObject(data['license']);
      }
    }
    return obj;
  }

  exports.prototype = Object.create(UserPublicSummary.prototype);
  exports.prototype.constructor = exports;

  /**
   * Email of the user
   * @member {String} email
   */
  exports.prototype['email'] = undefined;
  /**
   * Date of the last user activity
   * @member {Date} lastActivityDate
   */
  exports.prototype['lastActivityDate'] = undefined;
  /**
   * @member {module:model/UserDetailsAdminLicense} license
   */
  exports.prototype['license'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./ClassRoles":38,"./OrganizationRoles":64,"./UserDetailsAdminLicense":101,"./UserPublicSummary":104}],101:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/LicenseMode', 'model/LicenseSources'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./LicenseMode'), require('./LicenseSources'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.UserDetailsAdminLicense = factory(root.FlatApi.ApiClient, root.FlatApi.LicenseMode, root.FlatApi.LicenseSources);
  }
}(this, function(ApiClient, LicenseMode, LicenseSources) {
  'use strict';




  /**
   * The UserDetailsAdminLicense model module.
   * @module model/UserDetailsAdminLicense
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>UserDetailsAdminLicense</code>.
   * Current active license of the user
   * @alias module:model/UserDetailsAdminLicense
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>UserDetailsAdminLicense</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserDetailsAdminLicense} obj Optional instance to populate.
   * @return {module:model/UserDetailsAdminLicense} The populated <code>UserDetailsAdminLicense</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('expirationDate')) {
        obj['expirationDate'] = ApiClient.convertToType(data['expirationDate'], 'Date');
      }
      if (data.hasOwnProperty('source')) {
        obj['source'] = LicenseSources.constructFromObject(data['source']);
      }
      if (data.hasOwnProperty('mode')) {
        obj['mode'] = LicenseMode.constructFromObject(data['mode']);
      }
      if (data.hasOwnProperty('active')) {
        obj['active'] = ApiClient.convertToType(data['active'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * ID of the current license
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Date when the license expires
   * @member {Date} expirationDate
   */
  exports.prototype['expirationDate'] = undefined;
  /**
   * @member {module:model/LicenseSources} source
   */
  exports.prototype['source'] = undefined;
  /**
   * @member {module:model/LicenseMode} mode
   */
  exports.prototype['mode'] = undefined;
  /**
   * ID of the current license
   * @member {Boolean} active
   */
  exports.prototype['active'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./LicenseMode":55,"./LicenseSources":56}],102:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.UserInstruments = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The UserInstruments model module.
   * @module model/UserInstruments
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>UserInstruments</code>.
   * An array of the instrument identifiers that the user plays. This is mainly used to display a list of the instruments in the Flat&#39;s UI or instruments icons. The format of the strings is &#x60;{instrument-group}.{instrument-id}&#x60;. 
   * @alias module:model/UserInstruments
   * @class
   * @extends Array
   */
  var exports = function() {
    var _this = this;
    _this = new Array();
    Object.setPrototypeOf(_this, exports);

    return _this;
  };

  /**
   * Constructs a <code>UserInstruments</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserInstruments} obj Optional instance to populate.
   * @return {module:model/UserInstruments} The populated <code>UserInstruments</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      ApiClient.constructFromObject(data, obj, 'String');

    }
    return obj;
  }




  return exports;
}));



},{"../ApiClient":16}],103:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ClassRoles', 'model/OrganizationRoles', 'model/UserInstruments', 'model/UserPublicSummary'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ClassRoles'), require('./OrganizationRoles'), require('./UserInstruments'), require('./UserPublicSummary'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.UserPublic = factory(root.FlatApi.ApiClient, root.FlatApi.ClassRoles, root.FlatApi.OrganizationRoles, root.FlatApi.UserInstruments, root.FlatApi.UserPublicSummary);
  }
}(this, function(ApiClient, ClassRoles, OrganizationRoles, UserInstruments, UserPublicSummary) {
  'use strict';




  /**
   * The UserPublic model module.
   * @module model/UserPublic
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>UserPublic</code>.
   * Public User details
   * @alias module:model/UserPublic
   * @class
   * @extends module:model/UserPublicSummary
   */
  var exports = function() {
    var _this = this;
    UserPublicSummary.call(_this);








  };

  /**
   * Constructs a <code>UserPublic</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserPublic} obj Optional instance to populate.
   * @return {module:model/UserPublic} The populated <code>UserPublic</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      UserPublicSummary.constructFromObject(data, obj);
      if (data.hasOwnProperty('bio')) {
        obj['bio'] = ApiClient.convertToType(data['bio'], 'String');
      }
      if (data.hasOwnProperty('registrationDate')) {
        obj['registrationDate'] = ApiClient.convertToType(data['registrationDate'], 'Date');
      }
      if (data.hasOwnProperty('likedScoresCount')) {
        obj['likedScoresCount'] = ApiClient.convertToType(data['likedScoresCount'], 'Number');
      }
      if (data.hasOwnProperty('followersCount')) {
        obj['followersCount'] = ApiClient.convertToType(data['followersCount'], 'Number');
      }
      if (data.hasOwnProperty('followingCount')) {
        obj['followingCount'] = ApiClient.convertToType(data['followingCount'], 'Number');
      }
      if (data.hasOwnProperty('ownedPublicScoresCount')) {
        obj['ownedPublicScoresCount'] = ApiClient.convertToType(data['ownedPublicScoresCount'], 'Number');
      }
      if (data.hasOwnProperty('profileTheme')) {
        obj['profileTheme'] = ApiClient.convertToType(data['profileTheme'], 'String');
      }
      if (data.hasOwnProperty('instruments')) {
        obj['instruments'] = UserInstruments.constructFromObject(data['instruments']);
      }
    }
    return obj;
  }

  exports.prototype = Object.create(UserPublicSummary.prototype);
  exports.prototype.constructor = exports;

  /**
   * User's biography
   * @member {String} bio
   */
  exports.prototype['bio'] = undefined;
  /**
   * Date the user signed up
   * @member {Date} registrationDate
   */
  exports.prototype['registrationDate'] = undefined;
  /**
   * Number of the scores liked by the user
   * @member {Number} likedScoresCount
   */
  exports.prototype['likedScoresCount'] = undefined;
  /**
   * Number of followers the user have
   * @member {Number} followersCount
   */
  exports.prototype['followersCount'] = undefined;
  /**
   * Number of people the user follow
   * @member {Number} followingCount
   */
  exports.prototype['followingCount'] = undefined;
  /**
   * Number of public scores the user have
   * @member {Number} ownedPublicScoresCount
   */
  exports.prototype['ownedPublicScoresCount'] = undefined;
  /**
   * Theme (background) for the profile
   * @member {String} profileTheme
   */
  exports.prototype['profileTheme'] = undefined;
  /**
   * @member {module:model/UserInstruments} instruments
   */
  exports.prototype['instruments'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./ClassRoles":38,"./OrganizationRoles":64,"./UserInstruments":102,"./UserPublicSummary":104}],104:[function(require,module,exports){
/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ClassRoles', 'model/OrganizationRoles', 'model/UserBasics'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ClassRoles'), require('./OrganizationRoles'), require('./UserBasics'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.UserPublicSummary = factory(root.FlatApi.ApiClient, root.FlatApi.ClassRoles, root.FlatApi.OrganizationRoles, root.FlatApi.UserBasics);
  }
}(this, function(ApiClient, ClassRoles, OrganizationRoles, UserBasics) {
  'use strict';




  /**
   * The UserPublicSummary model module.
   * @module model/UserPublicSummary
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>UserPublicSummary</code>.
   * Public User details summary
   * @alias module:model/UserPublicSummary
   * @class
   * @extends module:model/UserBasics
   */
  var exports = function() {
    var _this = this;
    UserBasics.call(_this);




  };

  /**
   * Constructs a <code>UserPublicSummary</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserPublicSummary} obj Optional instance to populate.
   * @return {module:model/UserPublicSummary} The populated <code>UserPublicSummary</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      UserBasics.constructFromObject(data, obj);
      if (data.hasOwnProperty('organization')) {
        obj['organization'] = ApiClient.convertToType(data['organization'], 'String');
      }
      if (data.hasOwnProperty('organizationRole')) {
        obj['organizationRole'] = OrganizationRoles.constructFromObject(data['organizationRole']);
      }
      if (data.hasOwnProperty('classRole')) {
        obj['classRole'] = ClassRoles.constructFromObject(data['classRole']);
      }
      if (data.hasOwnProperty('htmlUrl')) {
        obj['htmlUrl'] = ApiClient.convertToType(data['htmlUrl'], 'String');
      }
    }
    return obj;
  }

  exports.prototype = Object.create(UserBasics.prototype);
  exports.prototype.constructor = exports;

  /**
   * Organization ID (for Edu users only)
   * @member {String} organization
   */
  exports.prototype['organization'] = undefined;
  /**
   * @member {module:model/OrganizationRoles} organizationRole
   */
  exports.prototype['organizationRole'] = undefined;
  /**
   * @member {module:model/ClassRoles} classRole
   */
  exports.prototype['classRole'] = undefined;
  /**
   * Link to user profile (for Indiv. users only)
   * @member {String} htmlUrl
   */
  exports.prototype['htmlUrl'] = undefined;



  return exports;
}));



},{"../ApiClient":16,"./ClassRoles":38,"./OrganizationRoles":64,"./UserBasics":97}]},{},[24]);
