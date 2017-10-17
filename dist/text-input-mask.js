'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var TinyMask = _interopDefault(require('tinymask'));

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var vanillaMasker = createCommonjsModule(function (module, exports) {
  (function (root, factory) {
    if (typeof undefined === 'function' && undefined.amd) {
      undefined(factory);
    } else {
      module.exports = factory();
    }
  })(commonjsGlobal, function () {
    var DIGIT = "9",
        ALPHA = "A",
        ALPHANUM = "S",
        BY_PASS_KEYS = [9, 16, 17, 18, 36, 37, 38, 39, 40, 91, 92, 93],
        isAllowedKeyCode = function isAllowedKeyCode(keyCode) {
      for (var i = 0, len = BY_PASS_KEYS.length; i < len; i++) {
        if (keyCode == BY_PASS_KEYS[i]) {
          return false;
        }
      }
      return true;
    },
        mergeMoneyOptions = function mergeMoneyOptions(opts) {
      opts = opts || {};
      opts = {
        precision: opts.hasOwnProperty("precision") ? opts.precision : 2,
        separator: opts.separator || ",",
        delimiter: opts.delimiter || ".",
        unit: opts.unit ? opts.unit + ' ' : "",
        //unit: opts.unit && (opts.unit.replace(/[\s]/g,'') + " ") || "",
        suffixUnit: opts.suffixUnit && " " + opts.suffixUnit.replace(/[\s]/g, '') || "",
        zeroCents: opts.zeroCents,
        lastOutput: opts.lastOutput
      };
      opts.moneyPrecision = opts.zeroCents ? 0 : opts.precision;
      return opts;
    },

    // Fill wildcards past index in output with placeholder
    addPlaceholdersToOutput = function addPlaceholdersToOutput(output, index, placeholder) {
      for (; index < output.length; index++) {
        if (output[index] === DIGIT || output[index] === ALPHA || output[index] === ALPHANUM) {
          output[index] = placeholder;
        }
      }
      return output;
    };

    var VanillaMasker = function VanillaMasker(elements) {
      this.elements = elements;
    };

    VanillaMasker.prototype.unbindElementToMask = function () {
      for (var i = 0, len = this.elements.length; i < len; i++) {
        this.elements[i].lastOutput = "";
        this.elements[i].onkeyup = false;
        this.elements[i].onkeydown = false;

        if (this.elements[i].value.length) {
          this.elements[i].value = this.elements[i].value.replace(/\D/g, '');
        }
      }
    };

    VanillaMasker.prototype.bindElementToMask = function (maskFunction) {
      var that = this,
          onType = function onType(e) {
        e = e || window.event;
        var source = e.target || e.srcElement;

        if (isAllowedKeyCode(e.keyCode)) {
          setTimeout(function () {
            that.opts.lastOutput = source.lastOutput;
            source.value = VMasker[maskFunction](source.value, that.opts);
            source.lastOutput = source.value;
            if (source.setSelectionRange && that.opts.suffixUnit) {
              source.setSelectionRange(source.value.length, source.value.length - that.opts.suffixUnit.length);
            }
          }, 0);
        }
      };
      for (var i = 0, len = this.elements.length; i < len; i++) {
        this.elements[i].lastOutput = "";
        this.elements[i].onkeyup = onType;
        if (this.elements[i].value.length) {
          this.elements[i].value = VMasker[maskFunction](this.elements[i].value, this.opts);
        }
      }
    };

    VanillaMasker.prototype.maskMoney = function (opts) {
      this.opts = mergeMoneyOptions(opts);
      this.bindElementToMask("toMoney");
    };

    VanillaMasker.prototype.maskNumber = function () {
      this.opts = {};
      this.bindElementToMask("toNumber");
    };

    VanillaMasker.prototype.maskAlphaNum = function () {
      this.opts = {};
      this.bindElementToMask("toAlphaNumeric");
    };

    VanillaMasker.prototype.maskPattern = function (pattern) {
      this.opts = { pattern: pattern };
      this.bindElementToMask("toPattern");
    };

    VanillaMasker.prototype.unMask = function () {
      this.unbindElementToMask();
    };

    var VMasker = function VMasker(el) {
      if (!el) {
        throw new Error("VanillaMasker: There is no element to bind.");
      }
      var elements = "length" in el ? el.length ? el : [] : [el];
      return new VanillaMasker(elements);
    };

    VMasker.toMoney = function (value, opts) {
      opts = mergeMoneyOptions(opts);
      if (opts.zeroCents) {
        opts.lastOutput = opts.lastOutput || "";
        var zeroMatcher = "(" + opts.separator + "[0]{0," + opts.precision + "})",
            zeroRegExp = new RegExp(zeroMatcher, "g"),
            digitsLength = value.toString().replace(/[\D]/g, "").length || 0,
            lastDigitLength = opts.lastOutput.toString().replace(/[\D]/g, "").length || 0;
        value = value.toString().replace(zeroRegExp, "");
        if (digitsLength < lastDigitLength) {
          value = value.slice(0, value.length - 1);
        }
      }
      var number = value.toString().replace(/[\D]/g, ""),
          clearDelimiter = new RegExp("^(0|\\" + opts.delimiter + ")"),
          clearSeparator = new RegExp("(\\" + opts.separator + ")$"),
          money = number.substr(0, number.length - opts.moneyPrecision),
          masked = money.substr(0, money.length % 3),
          cents = new Array(opts.precision + 1).join("0");
      money = money.substr(money.length % 3, money.length);
      for (var i = 0, len = money.length; i < len; i++) {
        if (i % 3 === 0) {
          masked += opts.delimiter;
        }
        masked += money[i];
      }
      masked = masked.replace(clearDelimiter, "");
      masked = masked.length ? masked : "0";
      if (!opts.zeroCents) {
        var beginCents = number.length - opts.precision,
            centsValue = number.substr(beginCents, opts.precision),
            centsLength = centsValue.length,
            centsSliced = opts.precision > centsLength ? opts.precision : centsLength;
        cents = (cents + centsValue).slice(-centsSliced);
      }

      var unitToApply = opts.unit[opts.unit.length - 1] === ' ' ? opts.unit.substring(0, opts.unit.length - 1) : opts.unit;
      var output = unitToApply + masked + opts.separator + cents + opts.suffixUnit;
      return output.replace(clearSeparator, "");
    };

    VMasker.toPattern = function (value, opts) {
      var pattern = (typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) === 'object' ? opts.pattern : opts,
          patternChars = pattern.replace(/\W/g, ''),
          output = pattern.split(""),
          values = value.toString().replace(/\W/g, ""),
          charsValues = values.replace(/\W/g, ''),
          index = 0,
          i,
          outputLength = output.length,
          placeholder = (typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) === 'object' ? opts.placeholder : undefined;

      for (i = 0; i < outputLength; i++) {
        // Reached the end of input
        if (index >= values.length) {
          if (patternChars.length == charsValues.length) {
            return output.join("");
          } else if (placeholder !== undefined && patternChars.length > charsValues.length) {
            return addPlaceholdersToOutput(output, i, placeholder).join("");
          } else {
            break;
          }
        }
        // Remaining chars in input
        else {
            if (output[i] === DIGIT && values[index].match(/[0-9]/) || output[i] === ALPHA && values[index].match(/[a-zA-Z]/) || output[i] === ALPHANUM && values[index].match(/[0-9a-zA-Z]/)) {
              output[i] = values[index++];
            } else if (output[i] === DIGIT || output[i] === ALPHA || output[i] === ALPHANUM) {
              if (placeholder !== undefined) {
                return addPlaceholdersToOutput(output, i, placeholder).join("");
              } else {
                return output.slice(0, i).join("");
              }
            }
          }
      }
      return output.join("").substr(0, i);
    };

    VMasker.toNumber = function (value) {
      return value.toString().replace(/(?!^-)[^0-9]/g, "");
    };

    VMasker.toAlphaNumeric = function (value) {
      return value.toString().replace(/[^a-z0-9 ]+/i, "");
    };

    return VMasker;
  });
});

// var VMasker = require('../internal-dependencies/vanilla-masker');

var BaseMask = function () {
	function BaseMask() {
		classCallCheck(this, BaseMask);
	}

	createClass(BaseMask, [{
		key: 'getKeyboardType',
		value: function getKeyboardType() {
			return "numeric";
		}
	}, {
		key: 'getVMasker',
		value: function getVMasker() {
			return vanillaMasker;
		}
	}, {
		key: 'mergeSettings',
		value: function mergeSettings(obj1, obj2) {
			var obj3 = {};
			for (var attrname in obj1) {
				obj3[attrname] = obj1[attrname];
			}
			for (var attrname in obj2) {
				obj3[attrname] = obj2[attrname];
			}
			return obj3;
		}
	}, {
		key: 'getRawValue',
		value: function getRawValue(maskedValue, settings) {
			return maskedValue;
		}
	}, {
		key: 'getDefaultValue',
		value: function getDefaultValue(value) {
			if (value === undefined || value === null) {
				return '';
			}

			return value;
		}
	}, {
		key: 'removeNotNumbers',
		value: function removeNotNumbers(text) {
			return text.replace(/[^0-9]+/g, '');
		}
	}, {
		key: 'removeWhiteSpaces',
		value: function removeWhiteSpaces(text) {
			return (text || '').replace(/\s/g, '');
		}
	}]);
	return BaseMask;
}();

var PHONE_8_MASK = '9999-9999';
var PHONE_9_MASK = '99999-9999';
var CEL_PHONE_SETTINGS = {
	withDDD: true,
	dddMask: '(99) '
};

var CelPhoneMask = function (_BaseMask) {
	inherits(CelPhoneMask, _BaseMask);

	function CelPhoneMask() {
		classCallCheck(this, CelPhoneMask);
		return possibleConstructorReturn(this, (CelPhoneMask.__proto__ || Object.getPrototypeOf(CelPhoneMask)).apply(this, arguments));
	}

	createClass(CelPhoneMask, [{
		key: 'getValue',
		value: function getValue(value, settings) {
			var mask = this._getMask(value, settings);
			return this.getVMasker().toPattern(value, mask);
		}
	}, {
		key: 'getRawValue',
		value: function getRawValue(maskedValue, settings) {
			return get(CelPhoneMask.prototype.__proto__ || Object.getPrototypeOf(CelPhoneMask.prototype), 'removeNotNumbers', this).call(this, maskedValue);
		}
	}, {
		key: 'validate',
		value: function validate(value, settings) {
			var valueToValidate = get(CelPhoneMask.prototype.__proto__ || Object.getPrototypeOf(CelPhoneMask.prototype), 'getDefaultValue', this).call(this, value);
			valueToValidate = this.getValue(value, settings);

			var mask = this._getMask(value, settings);

			return valueToValidate.length === mask.length;
		}
	}, {
		key: '_getMask',
		value: function _getMask(value, settings) {
			var _this2 = this;

			var mergedSettings = get(CelPhoneMask.prototype.__proto__ || Object.getPrototypeOf(CelPhoneMask.prototype), 'mergeSettings', this).call(this, CEL_PHONE_SETTINGS, settings);

			var numbers = get(CelPhoneMask.prototype.__proto__ || Object.getPrototypeOf(CelPhoneMask.prototype), 'removeNotNumbers', this).call(this, value);
			var mask = PHONE_8_MASK;

			var use9DigitMask = function () {
				if (mergedSettings.withDDD) {
					var numbersDDD = get(CelPhoneMask.prototype.__proto__ || Object.getPrototypeOf(CelPhoneMask.prototype), 'removeNotNumbers', _this2).call(_this2, mergedSettings.dddMask);
					var remainingValueNumbers = numbers.substr(numbersDDD.length);
					return remainingValueNumbers.length >= 9;
				} else {
					return numbers.length >= 9;
				}
			}();

			if (use9DigitMask) {
				mask = PHONE_9_MASK;
			}

			if (mergedSettings.withDDD) {
				mask = '' + mergedSettings.dddMask + mask;
			}

			return mask;
		}
	}], [{
		key: 'getType',
		value: function getType() {
			return 'cel-phone';
		}
	}]);
	return CelPhoneMask;
}(BaseMask);

var CNPJ_MASK = '99.999.999/9999-99';

var validateCnpj = function validateCnpj(cnpj) {
    var valida = new Array(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
    var dig1 = new Number();
    var dig2 = new Number();
    var i = 0;

    var exp = /\.|\-|\//g;
    cnpj = cnpj.toString().replace(exp, "");
    var digito = new Number(eval(cnpj.charAt(12) + cnpj.charAt(13)));

    for (i = 0; i < valida.length; i++) {
        dig1 += i > 0 ? cnpj.charAt(i - 1) * valida[i] : 0;
        dig2 += cnpj.charAt(i) * valida[i];
    }
    dig1 = dig1 % 11 < 2 ? 0 : 11 - dig1 % 11;
    dig2 = dig2 % 11 < 2 ? 0 : 11 - dig2 % 11;

    return dig1 * 10 + dig2 == digito;
};

var CnpjMask = function (_BaseMask) {
    inherits(CnpjMask, _BaseMask);

    function CnpjMask() {
        classCallCheck(this, CnpjMask);
        return possibleConstructorReturn(this, (CnpjMask.__proto__ || Object.getPrototypeOf(CnpjMask)).apply(this, arguments));
    }

    createClass(CnpjMask, [{
        key: 'getValue',
        value: function getValue(value, settings) {
            return this.getVMasker().toPattern(value, CNPJ_MASK);
        }
    }, {
        key: 'getRawValue',
        value: function getRawValue(maskedValue, settings) {
            return get(CnpjMask.prototype.__proto__ || Object.getPrototypeOf(CnpjMask.prototype), 'removeNotNumbers', this).call(this, maskedValue);
        }
    }, {
        key: 'validate',
        value: function validate(value, settings) {
            return validateCnpj(value);
        }
    }], [{
        key: 'getType',
        value: function getType() {
            return 'cnpj';
        }
    }]);
    return CnpjMask;
}(BaseMask);

var CPF_MASK = '999.999.999-99';

var validateCPF = function validateCPF(cpf) {
  if (cpf == "") {
    return true;
  }

  cpf = cpf.replace(/\./gi, "").replace(/-/gi, "");
  var isValid = true;
  var sum;
  var rest;
  var i;
  i = 0;
  sum = 0;

  if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999") {
    isValid = false;
  }

  for (i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  rest = sum * 10 % 11;

  if (rest == 10 || rest == 11) {
    rest = 0;
  }

  if (rest != parseInt(cpf.substring(9, 10))) {
    isValid = false;
  }

  sum = 0;

  for (i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  rest = sum * 10 % 11;

  if (rest == 10 || rest == 11) {
    rest = 0;
  }
  if (rest != parseInt(cpf.substring(10, 11))) {
    isValid = false;
  }

  return isValid;
};

var CpfMask = function (_BaseMask) {
  inherits(CpfMask, _BaseMask);

  function CpfMask() {
    classCallCheck(this, CpfMask);
    return possibleConstructorReturn(this, (CpfMask.__proto__ || Object.getPrototypeOf(CpfMask)).apply(this, arguments));
  }

  createClass(CpfMask, [{
    key: 'getValue',
    value: function getValue(value, settings) {
      return this.getVMasker().toPattern(value, CPF_MASK);
    }
  }, {
    key: 'getRawValue',
    value: function getRawValue(maskedValue, settings) {
      return get(CpfMask.prototype.__proto__ || Object.getPrototypeOf(CpfMask.prototype), 'removeNotNumbers', this).call(this, maskedValue);
    }
  }, {
    key: 'validate',
    value: function validate(value, settings) {
      return validateCPF(value);
    }
  }], [{
    key: 'getType',
    value: function getType() {
      return 'cpf';
    }
  }]);
  return CpfMask;
}(BaseMask);

var DEFAULT_TRANSLATION = {
	'9': function _(val) {
		return val.replace(/[^0-9]+/g, '');
	},
	'A': function A(val) {
		return val.replace(/[^a-zA-Z]+/g, '');
	},
	'S': function S(val) {
		return val.replace(/[^a-zA-Z0-9]+/g, '');
	},
	'*': function _(val) {
		return val;
	}
};

var CustomMask = function (_BaseMask) {
	inherits(CustomMask, _BaseMask);

	function CustomMask() {
		classCallCheck(this, CustomMask);
		return possibleConstructorReturn(this, (CustomMask.__proto__ || Object.getPrototypeOf(CustomMask)).apply(this, arguments));
	}

	createClass(CustomMask, [{
		key: 'getKeyboardType',
		value: function getKeyboardType() {
			return "default";
		}
	}, {
		key: 'getValue',
		value: function getValue(value, settings) {
			if (value === '') {
				return value;
			}
			var mask = settings.mask;

			var translation = this.mergeSettings(DEFAULT_TRANSLATION, settings.translation);

			var masked = new TinyMask(mask, { translation: translation }).mask(this.removeWhiteSpaces(value));
			return masked;
		}
	}, {
		key: 'getRawValue',
		value: function getRawValue(maskedValue, settings) {
			if (!!settings && settings.getRawValue) {
				return settings.getRawValue(maskedValue, settings);
			}

			return maskedValue;
		}
	}, {
		key: 'validate',
		value: function validate(value, settings) {
			if (!!settings && settings.validator) {
				return settings.validator(value, settings);
			}

			return true;
		}
	}], [{
		key: 'getType',
		value: function getType() {
			return 'custom';
		}
	}]);
	return CustomMask;
}(BaseMask);

var moment = require('moment');

var DATETIME_MASK_SETTINGS = {
    format: 'DD/MM/YYYY HH:mm:ss'
};

var DatetimeMask = function (_BaseMask) {
    inherits(DatetimeMask, _BaseMask);

    function DatetimeMask() {
        classCallCheck(this, DatetimeMask);
        return possibleConstructorReturn(this, (DatetimeMask.__proto__ || Object.getPrototypeOf(DatetimeMask)).apply(this, arguments));
    }

    createClass(DatetimeMask, [{
        key: 'getValue',
        value: function getValue(value, settings) {
            var mergedSettings = this._getMergedSettings(settings);
            var mask = '';

            for (var i = 0; i < mergedSettings.format.length; i++) {
                mask += mergedSettings.format[i].replace(/[a-zA-Z]+/g, '9');
            }

            return this.getVMasker().toPattern(value, mask);
        }
    }, {
        key: 'getRawValue',
        value: function getRawValue(maskedValue, settings) {
            var mergedSettings = this._getMergedSettings(settings);
            return moment(maskedValue, mergedSettings.format, true);
        }
    }, {
        key: 'validate',
        value: function validate(value, settings) {
            var maskedValue = this.getValue(value, settings);
            var mergedSettings = this._getMergedSettings(settings);
            var isValid = moment(maskedValue, mergedSettings.format, true).isValid();
            return isValid;
        }
    }, {
        key: '_getMergedSettings',
        value: function _getMergedSettings(settings) {
            return get(DatetimeMask.prototype.__proto__ || Object.getPrototypeOf(DatetimeMask.prototype), 'mergeSettings', this).call(this, DATETIME_MASK_SETTINGS, settings);
        }
    }], [{
        key: 'getType',
        value: function getType() {
            return 'datetime';
        }
    }]);
    return DatetimeMask;
}(BaseMask);

var MONEY_MASK_SETTINGS = {
    precision: 2,
    separator: ',',
    delimiter: '.',
    unit: 'R$',
    suffixUnit: '',
    zeroCents: false
};

var MoneyMask = function (_BaseMask) {
    inherits(MoneyMask, _BaseMask);

    function MoneyMask() {
        classCallCheck(this, MoneyMask);
        return possibleConstructorReturn(this, (MoneyMask.__proto__ || Object.getPrototypeOf(MoneyMask)).apply(this, arguments));
    }

    createClass(MoneyMask, [{
        key: 'getValue',
        value: function getValue(value, settings, oldValue) {
            var mergedSettings = get(MoneyMask.prototype.__proto__ || Object.getPrototypeOf(MoneyMask.prototype), 'mergeSettings', this).call(this, MONEY_MASK_SETTINGS, settings);

            if (mergedSettings.suffixUnit && oldValue && value) {
                // value: 123 R
                // oldValue: 123 R$

                if (value.length == oldValue.length - 1) {
                    var cleared = this.removeNotNumbers(value);
                    value = cleared.substr(0, cleared.length - 1);
                }
            }

            var masked = this.getVMasker().toMoney(value, mergedSettings);

            return masked;
        }
    }, {
        key: 'getRawValue',
        value: function getRawValue(maskedValue, settings) {
            var mergedSettings = get(MoneyMask.prototype.__proto__ || Object.getPrototypeOf(MoneyMask.prototype), 'mergeSettings', this).call(this, MONEY_MASK_SETTINGS, settings);
            var normalized = get(MoneyMask.prototype.__proto__ || Object.getPrototypeOf(MoneyMask.prototype), 'removeNotNumbers', this).call(this, maskedValue);

            var dotPosition = normalized.length - mergedSettings.precision;
            normalized = this._insert(normalized, dotPosition, '.');

            return Number(normalized);
        }
    }, {
        key: 'validate',
        value: function validate(value, settings) {
            return true;
        }
    }, {
        key: '_insert',
        value: function _insert(text, index, string) {
            if (index > 0) {
                return text.substring(0, index) + string + text.substring(index, text.length);
            } else {
                return string + text;
            }
        }
    }], [{
        key: 'getType',
        value: function getType() {
            return 'money';
        }
    }]);
    return MoneyMask;
}(BaseMask);

var OnlyNumbersMask = function (_BaseMask) {
    inherits(OnlyNumbersMask, _BaseMask);

    function OnlyNumbersMask() {
        classCallCheck(this, OnlyNumbersMask);
        return possibleConstructorReturn(this, (OnlyNumbersMask.__proto__ || Object.getPrototypeOf(OnlyNumbersMask)).apply(this, arguments));
    }

    createClass(OnlyNumbersMask, [{
        key: 'getValue',
        value: function getValue(value, settings) {
            return this.getVMasker().toNumber(value);
        }
    }, {
        key: 'getRawValue',
        value: function getRawValue(maskedValue, settings) {
            return get(OnlyNumbersMask.prototype.__proto__ || Object.getPrototypeOf(OnlyNumbersMask.prototype), 'removeNotNumbers', this).call(this, maskedValue);
        }
    }, {
        key: 'validate',
        value: function validate(value, settings) {
            return true;
        }
    }], [{
        key: 'getType',
        value: function getType() {
            return 'only-numbers';
        }
    }]);
    return OnlyNumbersMask;
}(BaseMask);

var ZIP_CODE_MASK = '99999-999';

var ZipCodeMask = function (_BaseMask) {
    inherits(ZipCodeMask, _BaseMask);

    function ZipCodeMask() {
        classCallCheck(this, ZipCodeMask);
        return possibleConstructorReturn(this, (ZipCodeMask.__proto__ || Object.getPrototypeOf(ZipCodeMask)).apply(this, arguments));
    }

    createClass(ZipCodeMask, [{
        key: 'getValue',
        value: function getValue(value, settings) {
            return this.getVMasker().toPattern(value, ZIP_CODE_MASK);
        }
    }, {
        key: 'getRawValue',
        value: function getRawValue(maskedValue, settings) {
            return get(ZipCodeMask.prototype.__proto__ || Object.getPrototypeOf(ZipCodeMask.prototype), 'removeNotNumbers', this).call(this, maskedValue);
        }
    }, {
        key: 'validate',
        value: function validate(value, settings) {
            if (!!value) {
                return value.length === ZIP_CODE_MASK.length;
            }

            return true;
        }
    }], [{
        key: 'getType',
        value: function getType() {
            return 'zip-code';
        }
    }]);
    return ZipCodeMask;
}(BaseMask);

var CREDIT_CARD_MASK = '9999 9999 9999 9999';
var CREDIT_CARD_OBFUSCATED_MASK = '9999 **** **** 9999';

var CREDIT_CARD_SETTINGS = {
    obfuscated: false
};

var CreditCardMask = function (_BaseMask) {
    inherits(CreditCardMask, _BaseMask);

    function CreditCardMask() {
        classCallCheck(this, CreditCardMask);
        return possibleConstructorReturn(this, (CreditCardMask.__proto__ || Object.getPrototypeOf(CreditCardMask)).apply(this, arguments));
    }

    createClass(CreditCardMask, [{
        key: 'getValue',
        value: function getValue(value, settings) {
            var selectedMask = this._getMask(settings);
            return this.getVMasker().toPattern(value, selectedMask);
        }
    }, {
        key: 'validate',
        value: function validate(value, settings) {
            if (!!value) {
                var selectedMask = this._getMask(settings);
                return value.length === selectedMask.length;
            }

            return true;
        }
    }, {
        key: 'getRawValue',
        value: function getRawValue(maskedValue, settings) {
            if (!maskedValue) return [];

            return maskedValue.split(' ').map(function (val) {
                if (!val) return '';

                return val.trim();
            });
        }
    }, {
        key: '_getMask',
        value: function _getMask(settings) {
            var mergedSettings = get(CreditCardMask.prototype.__proto__ || Object.getPrototypeOf(CreditCardMask.prototype), 'mergeSettings', this).call(this, CREDIT_CARD_SETTINGS, settings);
            var selectedMask = mergedSettings.obfuscated ? CREDIT_CARD_OBFUSCATED_MASK : CREDIT_CARD_MASK;
            return selectedMask;
        }
    }], [{
        key: 'getType',
        value: function getType() {
            return 'credit-card';
        }
    }]);
    return CreditCardMask;
}(BaseMask);

module.exports.CelPhoneMask = CelPhoneMask;
module.exports.CnpjMask = CnpjMask;
module.exports.CpfMask = CpfMask;
module.exports.CustomMask = CustomMask;
module.exports.DatetimeMask = DatetimeMask;
module.exports.MoneyMask = MoneyMask;
module.exports.OnlyNumbersMask = OnlyNumbersMask;
module.exports.ZipCodeMask = ZipCodeMask;
module.exports.CreditCardMask = CreditCardMask;

var Masks = Object.freeze({

});

var maskKeys = Object.keys(Masks);

var MaskResolver = function () {
	function MaskResolver() {
		classCallCheck(this, MaskResolver);
	}

	createClass(MaskResolver, null, [{
		key: 'resolve',
		value: function resolve(type) {
			var maskKey = maskKeys.filter(function (m) {
				var handler = Masks[m];
				return handler && handler.getType && handler.getType() === type;
			})[0];

			var handler = Masks[maskKey];

			if (!handler) {
				throw new Error('Mask type not supported.');
			}

			return new handler();
		}
	}]);
	return MaskResolver;
}();

var BaseTextComponent = function (_Component) {
    inherits(BaseTextComponent, _Component);

    function BaseTextComponent(props) {
        classCallCheck(this, BaseTextComponent);

        var _this = possibleConstructorReturn(this, (BaseTextComponent.__proto__ || Object.getPrototypeOf(BaseTextComponent)).call(this, props));

        _this.state = {
            type: props.type,
            value: '',
            options: null
        };

        _this._resolveMaskHandler();
        return _this;
    }

    createClass(BaseTextComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._bindProps(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this._bindProps(nextProps);
        }
    }, {
        key: 'updateValue',
        value: function updateValue(text) {
            var _this2 = this;

            var self = this;

            return new Promise(function (resolve, reject) {
                var maskedText = self._getMaskedValue(text);

                if (self._mustUpdateValue(maskedText)) {
                    self.setState({
                        value: maskedText
                    }, function () {
                        resolve(maskedText);
                    });
                } else {
                    resolve(_this2.state.value);
                }
            });
        }
    }, {
        key: 'isValid',
        value: function isValid() {
            return this._maskHandler.validate(this._getDefaultValue(this.state.value), this.state.options);
        }
    }, {
        key: 'getRawValue',
        value: function getRawValue() {
            return this._maskHandler.getRawValue(this._getDefaultValue(this.state.value), this.state.options);
        }
    }, {
        key: '_mustUpdateValue',
        value: function _mustUpdateValue(newValue) {
            return this.state.value !== newValue;
        }
    }, {
        key: '_resolveMaskHandler',
        value: function _resolveMaskHandler() {
            this._maskHandler = MaskResolver.resolve(this.state.type);
        }
    }, {
        key: '_bindProps',
        value: function _bindProps(props) {
            var self = this;
            var changeMaskHandler = this.state.type !== props.type;

            self.setState({
                type: props.type,
                options: props.options
            }, function () {
                if (changeMaskHandler) {
                    self._resolveMaskHandler();
                }

                var value = self._getDefaultMaskedValue(props.value);

                self.setState({
                    value: value
                });
            });
        }
    }, {
        key: '_getDefaultMaskedValue',
        value: function _getDefaultMaskedValue(value) {
            if (this._getDefaultValue(value) === '') {
                return '';
            }

            return this._getMaskedValue(value);
        }
    }, {
        key: '_getMaskedValue',
        value: function _getMaskedValue(value) {
            var oldValue = this.state.value;

            return this._maskHandler.getValue(this._getDefaultValue(value), this.state.options, oldValue);
        }
    }, {
        key: '_getDefaultValue',
        value: function _getDefaultValue(value) {
            if (value === undefined || value === null) {
                return '';
            }

            return value;
        }
    }]);
    return BaseTextComponent;
}(React.Component);

var INPUT_TEXT_REF = '$input-text';

var TextInputMask = function (_BaseTextComponent) {
	inherits(TextInputMask, _BaseTextComponent);

	function TextInputMask() {
		classCallCheck(this, TextInputMask);
		return possibleConstructorReturn(this, (TextInputMask.__proto__ || Object.getPrototypeOf(TextInputMask)).apply(this, arguments));
	}

	createClass(TextInputMask, [{
		key: 'getElement',
		value: function getElement() {
			return this.refs[INPUT_TEXT_REF];
		}
	}, {
		key: '_onChangeText',
		value: function _onChangeText(text) {
			var self = this;

			if (!this._checkText(text)) {
				return;
			}

			self.updateValue(text).then(function (maskedText) {
				if (self.props.onChangeText) {
					self.props.onChangeText(maskedText);
				}
			});
		}
	}, {
		key: '_checkText',
		value: function _checkText(text) {
			if (this.props.checkText) {
				return this.props.checkText(this.state.value, text);
			}

			return true;
		}
	}, {
		key: '_getKeyboardType',
		value: function _getKeyboardType() {
			return this.props.keyboardType || this._maskHandler.getKeyboardType();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var customTextInputProps = {};

			if (this.props.customTextInput) {
				Input = this.props.customTextInput;
				customTextInputProps = this.props.customTextInputProps || {};
			}

			return React__default.createElement('input', _extends({
				ref: INPUT_TEXT_REF,
				keyboardType: this._getKeyboardType()
			}, this.props, customTextInputProps, {
				onChange: function onChange(event) {
					return _this2._onChangeText(event.currentTarget.value);
				},
				value: this.state.value
			}));
		}
	}]);
	return TextInputMask;
}(BaseTextComponent);

module.exports = TextInputMask;
