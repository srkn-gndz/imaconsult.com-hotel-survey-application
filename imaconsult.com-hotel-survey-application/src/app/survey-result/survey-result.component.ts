import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user';

@Component({
  selector: 'app-survey-result',
  templateUrl: './survey-result.component.html',
  styleUrls: ['./survey-result.component.scss']
})
export class SurveyResultComponent implements OnInit {
  result_message = '';
  href_a = '';
  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.get_survey_24_result();
  }

  get_survey_24_result() {
    this.userService
    .get_survey_24_result(this.userService.survey_answers)
    .subscribe(response => {
      if(response.survey_result > 7) {
        if(response.hasOwnProperty('thanks_message_for_positive_reviews')) {
          this.result_message = response.thanks_message_for_positive_reviews;
        } 
        if(response.hasOwnProperty('positive_redirect_urls')) {
          this.href_a = response.positive_redirect_urls;
        }
      } else {
        if(response.hasOwnProperty('thanks_message_for_negative_reviews')) {
          this.result_message = response.thanks_message_for_negative_reviews;
        } 
        if(response.hasOwnProperty('negative_redirect_urls')) {
          this.href_a = response.negative_redirect_urls;
        }
      }
    });
  }

}
