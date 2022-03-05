import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user';

@Component({
  selector: 'app-survey-result',
  templateUrl: './survey-result.component.html',
  styleUrls: ['./survey-result.component.scss']
})
export class SurveyResultComponent implements OnInit {
  result_message = '';
  href_a = <any> [];
  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.get_survey_24_result();
  }

  get_survey_24_result() {
    this.userService
    .get_survey_24_result(this.userService.survey_answers)
    .subscribe(response => {
      response = response.body;
      if(response.survey_result > 7) {
        if(response.survey_header.hasOwnProperty('thanks_message_for_positive_reviews')) {
          this.result_message = response.survey_header.thanks_message_for_positive_reviews;
        } 
        if(response.survey_header.hasOwnProperty('positive_redirect_urls')) {
          response.survey_header.positive_redirect_urls.forEach((element: any) => {
            this.href_a.push(element);
          });
        }
      } else {
        if(response.survey_header.hasOwnProperty('thanks_message_for_negative_reviews')) {
          this.result_message = response.survey_header.thanks_message_for_negative_reviews;
        } 
        if(response.survey_header.hasOwnProperty('negative_redirect_urls')) {
          response.survey_header.negative_redirect_urls.forEach((element: any) => {
            this.href_a.push(element);
          });
        }
      }
    });
  }

}
