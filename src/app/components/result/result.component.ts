import { Component } from '@angular/core';
import { IpRequest } from 'src/app/services/ip-request.service';
import { ResultInfo } from 'src/app/dto/result-info';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {

  resultInfo: ResultInfo = new ResultInfo({});

  constructor(private serviceIpRequest: IpRequest){
    this.serviceIpRequest.readResult.subscribe((data: ResultInfo)=>{
      this.resultInfo = data;
    });

  }
}
