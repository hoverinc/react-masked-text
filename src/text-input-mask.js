import BaseTextComponent from './base-text-component';
import React from 'react'; 

export default class TextInputMask extends BaseTextComponent {

	getElement() {
		return this._input;
	}

	_onChangeText(text) {
		let self = this;

		if (!this._checkText(text)) {
			return;
		}

		self.updateValue(text)
			.then(maskedText => {
				if (self.props.onChangeText) {
					self.props.onChangeText(maskedText);
				}
			});
	}

	_checkText(text) {
		if (this.props.checkText) {
			return this.props.checkText(this.state.value, text);
		}

		return true;
	}

	render() {
		const { onBlur, style, name, maxLength, autofocus, disabled, placeholder, type } = this.props;

		return (
			<input
				ref={(ref) => {this._input = ref}}
				onChange={(event) => this._onChangeText(event.currentTarget.value)}
				value={this.state.value}
				type={type}
				disabled={disabled}
				autofocus={autofocus}
				placeholder={placeholder}
				name={name}
				maxlength={maxLength}
				style={style}
				onBlur={onBlur}
			/>
		);
	}
}
