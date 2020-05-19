import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgReduxModule} from '@angular-redux/store';
import {NgRedux, DevToolsExtension} from '@angular-redux/store';
import {rootReducer, ArchitectUIState} from './ThemeOptions/store';
import {ConfigActions} from './ThemeOptions/store/config.actions';
// import {AppRoutingModule} from './app-routing.module';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';

import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import { NgbdSortableHeaderDirective } from './DemoPages/Dashboards/requests/demo/sortable.directive'
// BOOTSTRAP COMPONENTS

import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {LaddaModule} from 'angular2-ladda';
import {NgxLoadingModule} from 'ngx-loading';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {ToastrModule} from 'ngx-toastr';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {CountUpModule} from 'countup.js-angular2';
import {AgmCoreModule} from '@agm/core';
import {ImageCropperModule} from 'ngx-image-cropper';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';
import {AngularStickyThingsModule} from '@w11k/angular-sticky-things';
import {NouisliderModule} from 'ng2-nouislider';
import {NgSelectModule} from '@ng-select/ng-select';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {JwBootstrapSwitchNg2Module} from 'jw-bootstrap-switch-ng2';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {TextMaskModule} from 'angular2-text-mask';
import {ClipboardModule} from 'ngx-clipboard';
import {TextareaAutosizeModule} from 'ngx-textarea-autosize';
import {ColorPickerModule} from 'ngx-color-picker';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {DROPZONE_CONFIG} from 'ngx-dropzone-wrapper';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {ChartsModule} from 'ng2-charts';

// ANGULAR MATERIAL COMPONENTS

import {MatCheckboxModule, MatRippleModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTreeModule} from '@angular/material/tree';

// LAYOUT

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {AppsLayoutComponent} from './Layout/apps-layout/apps-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';
import {ThemeOptions} from './theme-options';
import {OptionsDrawerComponent} from './ThemeOptions/options-drawer/options-drawer.component';
import {PageTitleComponent} from './Layout/Components/page-title/page-title.component';

import {IBMBaseLayoutComponent} from './ibm/Layout_ibm/base-layout/base-layout.component';
import {IBMAppsLayoutComponent} from './ibm/Layout_ibm/apps-layout/apps-layout.component';
import {IBMPagesLayoutComponent} from './ibm/Layout_ibm/pages-layout/pages-layout.component';
import {IBMPageTitleComponent} from './ibm/Layout_ibm/Components/page-title/page-title.component';


// HEADER

import {HeaderComponent} from './Layout/Components/header/header.component';
import {IBMHeaderComponent} from './ibm/Layout_ibm/Components/header/header.component';
import {DotsComponent} from './Layout/Components/header/elements/dots/dots.component';
import {SearchBoxComponent} from './Layout/Components/header/elements/search-box/search-box.component';
import {MegamenuComponent} from './Layout/Components/header/elements/mega-menu/mega-menu.component';
import {MegapopoverComponent} from './Layout/Components/header/elements/mega-menu/elements/megapopover/megapopover.component';
import {UserBoxComponent} from './Layout/Components/header/elements/user-box/user-box.component';
import {DrawerComponent} from './Layout/Components/header/elements/drawer/drawer.component';
import {IBMUserBoxComponent} from './ibm/Layout_ibm/Components/header/elements/user-box/user-box.component'
// SIDEBAR

import {SidebarComponent} from './Layout/Components/sidebar/sidebar.component';
import {IBMSidebarComponent} from './ibm/Layout_ibm/Components/sidebar/sidebar.component';
import {LogoComponent} from './Layout/Components/sidebar/elements/logo/logo.component';

// FOOTER

import {FooterComponent} from './Layout/Components/footer/footer.component';
import {FooterDotsComponent} from './Layout/Components/footer/elements/footer-dots/footer-dots.component';
import {FooterMenuComponent} from './Layout/Components/footer/elements/footer-menu/footer-menu.component';

// DEMO PAGES

// Dashboards


import {AnalyticsComponent} from './DemoPages/Dashboards/analytics/analytics.component';
import {IBMAnalyticsComponent} from './ibm/main_ibm/analytics.component';
// import {AdvertisementComponent} from './DemoPages/Dashboards/advertisement/advertisement.component';
// import {ManagementComponent} from './DemoPages/Dashboards/management/management.component';
// import {HelpdeskComponent} from './DemoPages/Dashboards/helpdesk/helpdesk.component';
// import {MonitoringComponent} from './DemoPages/Dashboards/monitoring/monitoring.component';
// import {CryptoComponent} from './DemoPages/Dashboards/crypto/crypto.component';
// import {ProjectManagementComponent} from './DemoPages/Dashboards/project-management/project-management.component';
// import {ProductComponent} from './DemoPages/Dashboards/product/product.component';
// import {StatisticsComponent} from './DemoPages/Dashboards/statistics/statistics.component';
import {UniversityComponent} from './DemoPages/Dashboards/university/university.component';
import {IBMUniversityComponent} from './ibm/university/university.component';
import {IBMUniversityDetailsComponent} from './ibm/universitydetail/universitydetail.component';
import {RequestsComponent} from './DemoPages/Dashboards/requests/requests.component';
import {IBMRequestsComponent} from './ibm/requests/requests.component';
import {IBMUniRequestsComponent} from './ibm/university_request/requests.component';
// Applications



// Pages

import {ForgotPasswordComponent} from './DemoPages/UserPages/forgot-password/forgot-password.component';
import {ForgotPasswordBoxedComponent} from './DemoPages/UserPages/forgot-password-boxed/forgot-password-boxed.component';
import {LoginBoxedComponent} from './DemoPages/UserPages/login-boxed/login-boxed.component';
import {LoginComponent} from './DemoPages/UserPages/login/login.component';

import {RegisterComponent} from './DemoPages/UserPages/register/register.component';

// Elements

// import {StandardComponent} from './DemoPages/Elements/Buttons/standard/standard.component';
// import {PillsComponent} from './DemoPages/Elements/Buttons/pills/pills.component';
// import {SquareComponent} from './DemoPages/Elements/Buttons/square/square.component';
// import {ShadowComponent} from './DemoPages/Elements/Buttons/shadow/shadow.component';
// import {ButtonIconsComponent} from './DemoPages/Elements/Buttons/icons/icons.component';
// import {DropdownsComponent} from './DemoPages/Elements/dropdowns/dropdowns.component';
// import {BadgesComponent} from './DemoPages/Elements/badges/badges.component';
// import {CardsComponent} from './DemoPages/Elements/cards/cards.component';
// import {LoadingIndicatorsComponent} from './DemoPages/Elements/loading-indicators/loading-indicators.component';
// import {ListGroupsComponent} from './DemoPages/Elements/list-groups/list-groups.component';
// import {NavigationMenusComponent} from './DemoPages/Elements/navigation-menus/navigation-menus.component';
// import {TimelineComponent} from './DemoPages/Elements/timeline/timeline.component';
// import {UtilitiesComponent} from './DemoPages/Elements/utilities/utilities.component';
// import {IconsComponent} from './DemoPages/Elements/icons/icons.component';

// Components

// import {AccordionsComponent} from './DemoPages/Components/accordions/accordions.component';
// import {TabsComponent} from './DemoPages/Components/tabs/tabs.component';
import {CalendarComponent} from './DemoPages/Components/calendar/calendar.component';
import {IBMCalendarComponent} from './ibm/calendar/calendar.component';
// import {CarouselComponent} from './DemoPages/Components/carousel/carousel.component';
// import {ImageCropComponent} from './DemoPages/Components/image-crop/image-crop.component';
// import {CountUpComponent} from './DemoPages/Components/count-up/count-up.component';
import {MapsComponent} from './DemoPages/Components/maps/maps.component';
//import {IBMMapsComponent} from './ibm/maps/maps.component';
// import {ModalsComponent} from './DemoPages/Components/modals/modals.component';
// import {NotificationsComponent} from './DemoPages/Components/notifications/notifications.component';
// import {ProgressBarComponent} from './DemoPages/Components/progress-bar/progress-bar.component';
// import {PaginationComponent} from './DemoPages/Components/pagination/pagination.component';
// import {RatingsComponent} from './DemoPages/Components/ratings/ratings.component';
// import {ScrollableComponent} from './DemoPages/Components/scrollable/scrollable.component';
// import {TooltipsPopoversComponent} from './DemoPages/Components/tooltips-popovers/tooltips-popovers.component';




// Tables


import {DynamicComponent} from './DemoPages/Tables/dynamic/dynamic.component';
import {StaffComponent} from './DemoPages/Tables/staff/staff.component';


// Widgets



// Forms Elements


import {StickyHeadersComponent} from './DemoPages/Forms/Elements/sticky-headers/sticky-headers.component';
import {IBMStickyHeadersComponent} from './ibm/sticky-headers/sticky-headers.component';

// Forms Components



// Charts



// Chart.js Examples



// Apex Charts

import {NgApexchartsModule} from 'ng-apexcharts';


// Gauges Charts

import {GaugeModule} from 'angular-gauge';
import {TrendModule} from 'ngx-trend';

// Angular Material
import { PdfViewerModule } from 'ng2-pdf-viewer'
import { PostsComponent } from './posts/posts.component';
import { RequestService } from './services/request.service';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

import { DocumentEditorModule } from '@txtextcontrol/tx-ng-document-editor';
import {PdfComponent} from './ibm/layout/layout.component';
import { ReqDetailComponent } from './DemoPages/Dashboards/requests/req-detail/req-detail.component';
import { IbmReqDetailComponent } from './ibm/requests/ibm-req-detail/ibm-req-detail.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const route = [
  {
    path: 'dashboard',
    component: BaseLayoutComponent,
    children: [
      // University Dashboads
      {path: '', component: AnalyticsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate:[AuthGuard]},
      {path: 'analytics', component: AnalyticsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate:[AuthGuard]},
      {path: 'university', component: UniversityComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate:[AuthGuard]},
      {path: 'requests', component: RequestsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate:[AuthGuard]},{path: 'pdf', component: PdfComponent, data: {extraParameter: 'dashboardsMenu'},canActivate:[AuthGuard] },
      {path:'req-detail', component: ReqDetailComponent,data: {extraParameter: 'dashboardsMenu'},canActivate:[AuthGuard] }, 
      {path:'userbox', component: UserBoxComponent,data: {extraParameter: 'dashboardsMenu'},canActivate:[AuthGuard] }, 
      {path: 'calendar', component: CalendarComponent, data: {extraParameter: 'componentsMenu'}, canActivate:[AuthGuard]},
      {path: 'maps', component: MapsComponent, data: {extraParameter: 'componentsMenu'}, canActivate:[AuthGuard]},
      {path: 'sticky-headers', component: StickyHeadersComponent, data: {extraParameter: 'formElementsMenu'}, canActivate:[AuthGuard]}
    ]
  },
  {
    path:'ibm',
    component: IBMBaseLayoutComponent,
    children: [
      // IBM Dashboads
      {path: '', component: IBMAnalyticsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate:[AuthGuard]},
      {path: 'analytics', component: IBMAnalyticsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate:[AuthGuard]},
      {path: 'university', component: IBMUniversityComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate:[AuthGuard]},
      {path: 'university-detail', component: IBMUniversityDetailsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate:[AuthGuard]},
      {path: 'requests', component: IBMRequestsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate:[AuthGuard]},
      {path: 'pdf', component: PdfComponent, data: {extraParameter: 'dashboardsMenu'},canActivate:[AuthGuard] },
      {path:'req-detail', component: IbmReqDetailComponent,data: {extraParameter: 'dashboardsMenu'},canActivate:[AuthGuard] }, 
      {path: 'calendar', component: IBMCalendarComponent, data: {extraParameter: 'componentsMenu'}, canActivate:[AuthGuard]},
      //{path: 'maps', component: IBMMapsComponent, data: {extraParameter: 'componentsMenu'}, canActivate:[AuthGuard]},
      {path: 'sticky-headers', component: IBMStickyHeadersComponent, data: {extraParameter: 'formElementsMenu'}, canActivate:[AuthGuard]},
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  
  {path: '' , redirectTo:'/login',pathMatch:'full'}
];


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};


@NgModule({
  declarations: [

    // LAYOUT

    AppComponent,
    BaseLayoutComponent,
    AppsLayoutComponent,
    PagesLayoutComponent,
    OptionsDrawerComponent,
    PageTitleComponent,

    IBMBaseLayoutComponent,
    IBMAppsLayoutComponent,
    IBMPagesLayoutComponent,
    IBMHeaderComponent,
    IBMPageTitleComponent,
    PdfComponent,
    // HEADER

    HeaderComponent,
    DotsComponent,
    SearchBoxComponent,
    MegamenuComponent,
    MegapopoverComponent,
    UserBoxComponent,
    IBMUserBoxComponent,
    DrawerComponent,

    // SIDEBAR

    SidebarComponent,
    IBMSidebarComponent,
    LogoComponent,

    // FOOTER

    FooterComponent,
    FooterDotsComponent,
    FooterMenuComponent,

    // DEMO PAGES

    // Dashboards

    AnalyticsComponent,
    IBMAnalyticsComponent,
    RequestsComponent,
    ReqDetailComponent,
    IbmReqDetailComponent,
    IBMRequestsComponent,
    IBMUniRequestsComponent,
    //Applications

    
    // User Pages

    
    LoginComponent,
    RegisterComponent,

    // Elements

    // StandardComponent,
    // PillsComponent,
    // SquareComponent,
    // ShadowComponent,
    // IconsComponent,
    // DropdownsComponent,
    // BadgesComponent,
    // CardsComponent,
    // LoadingIndicatorsComponent,
    // ListGroupsComponent,
    // NavigationMenusComponent,
    // TimelineComponent,
    // UtilitiesComponent,
    // ButtonIconsComponent,

    // Components

    // AccordionsComponent,
    // TabsComponent,
    CalendarComponent,
    IBMCalendarComponent,
    // CarouselComponent,
    // ImageCropComponent,
    // CountUpComponent,
    
    MapsComponent,
    // ModalsComponent,
    // NotificationsComponent,
    // ProgressBarComponent,
    // PaginationComponent,
    // RatingsComponent,
    // ScrollableComponent,
    // TooltipsPopoversComponent,

    // Tables

    // RegularComponent,
    DynamicComponent,
    
    StaffComponent,
    IBMUniversityDetailsComponent,
    
    // TablesMainComponent,

    // // Dashboard Boxes

    // ChartBoxes1Component,
    // ChartBoxes2Component,
    // ChartBoxes3Component,
    // ProfileBoxesComponent,

    // // // Form Elements

    // ControlsComponent,
    // LayoutComponent,
    // ValidationComponent,
    StickyHeadersComponent,
    IBMStickyHeadersComponent,
    // // Form Widgets

    // DatepickerComponent,
    // TimepickerComponent,
    // RangeSliderComponent,
    // InputSelectsComponent,
    // ToggleSwitchComponent,
    // WysiwygEditorComponent,
    // InputMaskComponent,
    // ClipboardComponent,
    // TextareaAutosizeComponent,
    // ColorpickerComponent,
    // DropzoneComponent,
    // TypeaheadComponent,

    // // CHARTS

    // ChartjsComponent,
    // ApexchartsComponent,
    // GaugesComponent,
    // SparklinesComponent,

    // // // Apex Charts

    // SeriesPipe,

    // // Chart.js Examples

    // LineChartComponent,
    // BarChartComponent,
    // DoughnutChartComponent,
    // RadarChartComponent,
    // PieChartComponent,
    // PolarAreaChartComponent,
    // DynamicChartComponent,
    // BubbleChartComponent,
    // ScatterChartComponent,

    // // ANGULAR MATERIAL

    // AutoCompleteComponent,
    // CheckboxComponent,
    // RadioComponent,
    // DatepickerComponent2,
    // FormFieldComponent,
    // InputComponent,
    // SelectComponent,
    // SliderComponent,
    // SliderToggleComponent,
    // MenuMatComponent,
    // CardMatComponent,
    // DividerComponent,
    // ExpansionPanelComponent,
    // GridListComponent,
    // MatTabsComponent,
    // ListMatComponent,
    // StepperComponent,
    // TreeComponent,
    // ButtonToggleComponent,
    // ChipsComponent,
    // MatButtonsComponent,
    // ProgressSpinnerComponent,
    // RipplesComponent,
    // SnackbarComponent,
    // TooltipComponent,
    // PaginatorComponent,
    // TableComponent,
    // MatTabsComponent,
    // MatButtonsComponent,
    // MatProgressBarComponent,
    NgbdSortableHeaderDirective,
    UniversityComponent,
    IBMUniversityComponent,
    PostsComponent,
    PdfComponent,
    ReqDetailComponent,
    IbmReqDetailComponent,

  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    BrowserAnimationsModule,
    NgReduxModule,
    CommonModule,
    LoadingBarRouterModule,
    PdfViewerModule,
    // Angular Bootstrap Components

    PerfectScrollbarModule,
    NgbModule,
    AngularFontAwesomeModule,
    LaddaModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    RoundProgressModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
    ToastrModule.forRoot(),
    SlickCarouselModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CountUpModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDHDgSY3z1m5_ohvDFcxwrSA9CYwOS0yQQ'
    }),
    ImageCropperModule,
    AngularStickyThingsModule,
    NouisliderModule,
    NgSelectModule,
    SelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    AngularEditorModule,
    HttpClientModule,
    TextMaskModule,
    ClipboardModule,
    TextareaAutosizeModule,
    ColorPickerModule,
    DropzoneModule,

    // Charts

    ChartsModule,
    NgApexchartsModule,
    GaugeModule.forRoot(),
    TrendModule,

    // Angular Material Components

    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTreeModule,
    MatRippleModule,
    
    RouterModule.forRoot(route),
    
    DocumentEditorModule
  ],
  providers: [
    {
      provide:
      PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
      DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
    },
    ConfigActions,
    ThemeOptions,
    RequestService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private ngRedux: NgRedux<ArchitectUIState>,
              private devTool: DevToolsExtension) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

  }
}
