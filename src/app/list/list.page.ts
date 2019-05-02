import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, count } from 'rxjs/operators';
import { appService } from '../app.service';
import { AlertController } from '@ionic/angular';
import { Observable, interval, Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  
  public students: Object = [];
  public data: Object;
  public temp_var: Object = false;
  private updateSubscription: Subscription;
  ngOnInit(): void {
    this.loadstudents()
    // update Data fro
    // this.updateSubscription = interval(10000).subscribe(
    //   (val) => {
    //     this.loadstudents()
    //   })
    
  }
 
  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
this.loadstudents();
  }

  constructor(private device: Device,public toastController: ToastController,private http: HttpClient, public restApi: appService, public alertController: AlertController) {
  }
  public uuid = this.device.uuid

  // Get students list
  loadstudents() {
    return this.restApi.getEmployees(this.device.uuid).pipe(map(res => res['data'])).subscribe((data) => {
      console.log(data)
      this.students = data;
    })
  }
  // Delete employee
   deleteEmployee(id) {
    console.log(id);
    this.restApi.deleteEmployee(id).subscribe(async data => {
      this.loadstudents();
      // const toast = await this.toastController.create({
      //   message: 'Successfully deleted.',
      //   duration: 2000
      // });
      // toast.present();
    })
  }

}
