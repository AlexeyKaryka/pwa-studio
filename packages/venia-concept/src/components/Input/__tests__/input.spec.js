import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Input from '../input';

configure({ adapter: new Adapter() });

const classes = {
    resetInput: 'resetInput'
};

const validInputProps = {
    initialValue: 'example initial value',
    fieldValue: 'field value',
    setFieldValue: value => `changes value to ${value}`,
    getIsFieldTouched: () => false,
    placeholder: 'Enter username here',
    label: 'Username',
    type: 'Text',
    disabled: false,
    required: false,
    helpText: 'example help text',
    getHelpText: () => 'example help text',
    onChange: () => null,
    onFocus: () => null,
    onBlur: () => null,
    field: 'value',
    validate: () => null,
    validateOnChange: true
};

test('correctly assigns all props passed to `input` field', () => {
    const wrapper = shallow(<Input {...validInputProps} />);

    const wrapperProps = wrapper
        .dive()
        .find('Text')
        .props();

    const typeProp = wrapperProps.type;
    expect(typeProp).toEqual(validInputProps.type);

    const disabledProp = wrapperProps.disabled;
    expect(disabledProp).toEqual(validInputProps.disabled);

    const placeholderProp = wrapperProps.placeholder;
    expect(placeholderProp).toEqual(validInputProps.placeholder);

    const initialValueProp = wrapperProps.initialValue;
    expect(initialValueProp).toEqual(validInputProps.initialValue);
});

test('displays `helpText` when `helpVisible`', () => {
    const wrapper = shallow(<Input {...validInputProps} />).dive();

    const helpText = shallow(wrapper.instance().helpText);
    expect(helpText.html()).toContain(validInputProps.helpText);
});

test('set state to `focused` on `Text` focus', () => {
    const wrapper = shallow(<Input {...validInputProps} />).dive();

    expect(wrapper.state().focused).toBeFalsy();
    wrapper.find('Text').simulate('focus');
    expect(wrapper.state().focused).toBeTruthy();
});

test('display reset button only when text has been typed in input', () => {
    const wrapperFilled = shallow(
        <Input classes={classes} {...validInputProps} />
    ).dive();
    expect(wrapperFilled.find(`.${classes.resetInput}`)).toHaveLength(1);

    const wrapperEmpty = shallow(
        <Input classes={classes} {...validInputProps} fieldValue={''} />
    ).dive();
    expect(wrapperEmpty.find(`.${classes.resetInput}`)).toHaveLength(0);
});
