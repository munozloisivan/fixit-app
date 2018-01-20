import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactoComponent implements OnInit {
  messageToSend.email = this.emailC;

  constructor() {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
  function(user, done) {
    var data = {
      to: user.email,
      from:user.email,
      subject: user.,
      context: {
        url: 'http://localhost/reset_password?token=' ,
        name: user.name.split(' ')[0]
      },
    };

    smtpTransport.sendMail(data, function(err) {
      if (!err) {
        return res.json({ message: 'Kindly check your email for further instructions' });
      } else {
        return done(err);
      }
    });
  }
}
