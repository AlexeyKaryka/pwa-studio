import { isString } from 'util';

const emptyFieldMessage = 'This field cannot be empty';

export const validatorNotEmpty = value => {
    return isString(value) && value.length > 0 ? null : emptyFieldMessage;
};

export const dumpValidator = () => null;
