import { FormGroup } from '@angular/forms';

export const isFieldInvalid = (
    form: FormGroup | null,
    fieldName: string,
    isFormSubmitted: boolean
): boolean => {
    if (form) {
        const fieldControl = form.get(fieldName);

        return (
            (fieldControl?.invalid ?? false) &&
            (fieldControl?.touched || isFormSubmitted)
        );
    }

    return false;
};
