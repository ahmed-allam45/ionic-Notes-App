import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { appService } from '../app.service';
import { AlertController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{


  @Input() employeeDetails = { Title: '', Description: '', color: '#000000' , bgcolor: '#ffffff' , uuid: this.device.uuid }
  constructor(
    
    public restApi: appService, 
    public router: Router,
    public alertController: AlertController,
    private device: Device,
    private fb: FormBuilder,
  ) { }
  ngOnInit() {
  }
  async addEmployee(dataEmployee) {
    this.restApi.createEmployee(this.employeeDetails).subscribe(async (data: {}) => {
      console.log(data)
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Subtitle',
        message: 'This is an alert message.',
        buttons: ['OK']
      });
       await alert.present();
       this.router.navigate(['/list']);
      
    })
  }

}
