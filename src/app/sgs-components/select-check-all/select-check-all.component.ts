import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
    selector: 'app-select-check-all',
    templateUrl: './select-check-all.component.html',
    styleUrls: ['./select-check-all.component.scss'],
})
export class SelectCheckAllComponent {
    @Input() model: AbstractControl | null | undefined;
    @Input() values: any[] = [];
    @Input() text = 'Select All';

    isChecked(): boolean {
        return this.model?.value && this.values.length && this.model?.value.length === this.values.length;
    }

    isIndeterminate(): boolean {
        return (
            this.model?.value &&
            this.values.length &&
            this.model?.value.length &&
            this.model?.value.length < this.values.length
        );
    }

    toggleSelection(change: MatCheckboxChange): void {
        if (change.checked) {
            this.model?.setValue(this.values);
        } else {
            this.model?.setValue([]);
        }
    }
}
