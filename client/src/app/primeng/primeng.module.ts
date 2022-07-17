import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ListboxModule } from 'primeng/listbox';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    CommonModule,
    AvatarModule,
    AvatarGroupModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    PasswordModule,
    TooltipModule,
    InputSwitchModule,
    OverlayPanelModule,
    ListboxModule,
    DividerModule,
    TableModule,
    InputTextareaModule,
    DropdownModule,
    PanelModule,
    RadioButtonModule,
    CalendarModule,
    TagModule,
    TabViewModule,
  ],
})
export class PrimengModule {}
