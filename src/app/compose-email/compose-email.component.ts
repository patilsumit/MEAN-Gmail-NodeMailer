import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compose-email',
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.css']
})
export class ComposeEmailComponent implements OnInit {
 

  compose:Compose ={ 
    sender: '',
    subject: '',
    description: ''
  }

  constructor(private sendservice:AuthserviceService,private route:Router) { }

  ngOnInit() {
  }


  sendEmail(){
    this.sendservice.sendEmail(this.compose).subscribe((response)=>
        
        this.route.navigateByUrl('/users/profile')
     )
  }
   
}
interface  Compose{
  sender?: string;
  subject?: string;
  description?: string;
}

