import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare let $: any;
@Component({
  selector: 'app-dashboard-viewer',
  templateUrl: './dashboard-viewer.component.html',
  styleUrls: ['./dashboard-viewer.component.scss']
})
export class DashboardViewerComponent implements OnInit {
  @ViewChild('reveal') el: ElementRef;
  private revealView: any;

  constructor(private route: ActivatedRoute)
  {
  }

  ngOnInit() {
     let id = this.route.snapshot.paramMap.get("id");
     //uppercase the id so it matches the dashboard id on the server
     //let id="Sales";
     id = id[0].toUpperCase() + id.substring(1);

     $.ig.RevealUtility.loadDashboard(id, (dashboard) => {
       this.revealView = new $.ig.RevealView(this.el.nativeElement);
       $.ig.RevealSdkSettings.theme = new $.ig.MountainDarkTheme();
       this.revealView.canEdit = 'true';
       this.revealView.dashboard = dashboard;
     }, (err) => {
       console.error('revealView', err);
     });
   }
}
