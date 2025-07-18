import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
    FormGroup,
} from '@angular/forms';

export const passwordsMatchValidator: ValidatorFn = (
    formGroup: AbstractControl
): ValidationErrors | null => {
    const group = formGroup as FormGroup;
    const password = group.get('password');
    const confirm = group.get('passwordConfirmation');

    if (!password || !confirm) return null;

    const passwordVal = password.value;
    const confirmVal = confirm.value;

    if (passwordVal !== confirmVal) {
        // bestehende Fehler beibehalten
        const errors = confirm.errors || {};
        errors['passwordsMismatch'] = true;
        confirm.setErrors(errors);
    } else {
        // nur unseren Fehler entfernen, andere behalten
        const errors = confirm.errors;
        if (errors) {
            delete errors['passwordsMismatch'];
            if (Object.keys(errors).length === 0) {
                confirm.setErrors(null);
            } else {
                confirm.setErrors(errors);
            }
        }
    }

    return null; // wichtig: Fehler wird nur ans Feld gehängt, nicht an die Gruppe
};
