import {
  AfterViewChecked,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ModalConfig} from '../../../types/modal.types';
import {ModalService} from '../../../services/modal.service';
import {Subscription} from 'rxjs';
import {Button} from '../../../../shared/components/ui/button/button';
import {FormControl, FormGroup} from '@angular/forms';
import {FormFieldConfig} from '../../../types/form-field.typs';
import {ToasterState} from '../../../services/toaster.state';

@Component({
  selector: 'app-base-modal',
  imports: [
    Button
  ],
  templateUrl: './base-modal.html',
  styleUrl: './base-modal.scss',
})
export class BaseModal implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('modalBody', { read: ViewContainerRef }) modalBody!: ViewContainerRef;

  protected modalService: ModalService = inject(ModalService);
  protected toasterState: ToasterState = inject(ToasterState);

  protected config: ModalConfig | null = null;
  private subscriptions: Subscription = new Subscription();

  public ngOnInit(): void {
    this.initSubscription();
  }

  public ngAfterViewChecked(): void {
    if (this.config?.component && this.modalBody && !this.modalBody.length) {
      this.openDynamicComponent(this.config);
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onOverlayClick(): void {
    this.modalService.close();
  }

  protected closeModal(): void {
    this.modalService.close();
  }

  protected initForm(formFields: Array<FormFieldConfig>): FormGroup {
    const group: { [key: string]: FormControl } = {};

    formFields.forEach(field => {
      group[field.key] = new FormControl('', field.validators || []);
    });

    return new FormGroup(group);
  }

  private initSubscription(): void {
    this.subscriptions.add(
      this.modalService.modal$.subscribe(config => {
        this.config = config;
        this.config?.component && this.openDynamicComponent(this.config);
      })
    );
  }

  private openDynamicComponent(config: ModalConfig): void {
    if (!this.modalBody) { return; }

    this.modalBody.clear();
    const componentRef = this.modalBody.createComponent(config.component);
    if (config.data && componentRef.instance) {
      Object.assign(componentRef.instance, config.data);
    }
  }
}
