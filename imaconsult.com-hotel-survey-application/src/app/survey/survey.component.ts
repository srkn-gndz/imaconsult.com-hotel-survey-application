import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  survey = <any> {};
  answers = <any> []

  constructor(private route : Router, public userService: UserService) { }

  ngOnInit(): void {
    this.survey_24(); 
  }

  survey_24() {
    this.userService
    .survey_24()
    .subscribe(response => {
      this.survey = response.body;
    });
  }

  send() {
    this.userService.survey_answers = {survey_answers: [], note: ''};

    this.survey.survey_lines.forEach((element: any, index: number) => {
      if(element.question_type == 'boolean') {
        if(parseInt(this.answers[index]) == 10 ) {
          element.answer = 'Evet';
        } else {
          element.answer = 'Hayır';
        }
      } else if(element.question_type == 'smile') {
        if(parseInt(this.answers[index]) == 2 ) {
          element.answer = 'Hiç memnun değilim';
        } else if(parseInt(this.answers[index]) == 4 ) {
          element.answer = 'Memnun değilim';
        } else if(parseInt(this.answers[index]) == 6 ) {
          element.answer = 'Vasat';
        } else if(parseInt(this.answers[index]) == 8 ) {
          element.answer = 'Memnunum';
        } else if(parseInt(this.answers[index]) == 10 ) {
          element.answer = 'Çok memnunum';
        }
      } else {
        element.answer = this.answers[index];
      }
      element.answer_numeric = parseInt(this.answers[index])
      element.profile_id = this.userService.user.id;
      element.survey_line_id = element.id;
      delete element.id;
      delete element.created_at;
      delete element.updated_at;
      this.userService.survey_answers.survey_answers.push(element);
    });

    this.route.navigate(['survey-result'])
  }

}
