import { Component } from '@angular/core';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css',
})
export class ApplicationsComponent {
  apps = [
    {
      title: 'Currency Converter',
      image: 'assets/images/converter-preview.png',
      description: 'Quickly convert between currencies in real-time.',
      route: 'converter',
    },
    {
      title: 'Chat with AI',
      image: 'assets/images/chat-ai-preview.png',
      description: 'Ask questions, get insights — powered by AI.',
      route: 'chat-ai',
    },
  ];
}
