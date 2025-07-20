import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatAiService } from './service/chat-ai.service';
import { ChatMessage } from '../../model/chat-message';

@Component({
  selector: 'app-chat-ai',
  templateUrl: './chat-ai.component.html',
  styleUrls: ['./chat-ai.component.css'],
})
export class ChatAiComponent implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer: ElementRef | undefined;
  messages: ChatMessage[] = [];
  userInput: string = '';
  isTyping: boolean = false;

  constructor(private chatService: ChatAiService) {}

  sendMessage(): void {
    const input = this.userInput.trim();
    if (!input) return;

    this.messages.push({ sender: 'user', text: input });
    this.userInput = '';
    this.getAiResponse(input);
  }

  getAiResponse(prompt: string): void {
    this.isTyping = true;

    this.chatService.sendPrompt(prompt).subscribe({
      next: (res) => {
        this.messages.push({ sender: 'ai', text: res.response });
        this.isTyping = false;
      },
      error: (err) => {
        this.messages.push({
          sender: 'ai',
          text: 'Sorry, something went wrong.',
        });
        this.isTyping = false;
        console.error(err);
      },
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.scrollContainer) {
      const scrollContainer = this.scrollContainer.nativeElement;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }
}
