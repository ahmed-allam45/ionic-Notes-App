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
  ) { 

  }
  formName: FormGroup;
  // onKeydownEvent(event){
  //   //console.log(event.target.name);

  //   //console.log(event.target.textLength)
  //   console.log(event.srcElement.selectionEnd)

  //   if(event.srcElement.selectionEnd <= 0){
  //     console.log(event.target.name)
  //   }
  // }
  model: any = {};
  invalid:any = '';
  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.employeeDetails))
  }
  ngOnInit() {
 
    // alert('this.device.cordova : ' + this.device.cordova);
    // alert('this.device.isVirtual : ' + this.device.isVirtual);
    // alert('this.device.manufacturer : ' + this.device.manufacturer);
    // alert('this.device.model : ' + this.device.model);
    // alert('this.device.platform : ' + this.device.platform);
    // alert('this.device.serial : ' + this.device.serial);
     //alert('this.device.uuid' + this.device.uuid);
    // alert('this.device.version' + this.device.version)

  //   this.uniqueDeviceID.get()
  // .then((uuid: any) => alert(uuid))
  // .catch((error: any) => alert(error));
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
