import { Component, inject, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ExpenseService, Expense } from '../../core/services/expense.service';
import { User } from '../../shared/interfaces/auth-response.interface';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  private authService = inject(AuthService);
  private expenseService = inject(ExpenseService);

  currentUser: User | null = null;
  expenses: Expense[] = [];
  totalBalance: number = 0; // Añadida la propiedad totalBalance
  chart: Chart | null = null;

  newExpense: Expense = {
    description: '',
    amount: 0,
    category: ''
  };

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    this.loadExpenses();
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe({
      next: (expenses) => {
        this.expenses = expenses;
        this.updateTotalBalance(); // Actualizar el balance total
        if (this.chart) {
          this.updateChart();
        }
      },
      error: (err) => console.error('Error loading expenses:', err)
    });
  }

  // Nuevo método para calcular el balance total
  updateTotalBalance(): void {
    this.totalBalance = this.expenses.reduce((acc, expense) => acc + Number(expense.amount), 0);
  }

  addExpense(): void {
    if (!this.newExpense.description || !this.newExpense.category) {
      alert('Por favor completa todos los campos');
      return;
    }

    this.expenseService.createExpense(this.newExpense).subscribe({
      next: () => {
        this.newExpense = { description: '', amount: 0, category: '' };
        this.loadExpenses();
      },
      error: (err) => console.error('Error creating expense:', err)
    });
  }

  deleteExpense(id: number | undefined): void {
    if (!id) return;
    this.expenseService.deleteExpense(id).subscribe({
      next: () => this.loadExpenses(),
      error: (err) => console.error('Error deleting expense:', err)
    });
  }

  createChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [
            '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6',
            '#ec4899', '#06b6d4', '#f97316', '#84cc16', '#a855f7'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });

    this.updateChart();
  }

  updateChart(): void {
    if (!this.chart) return;

    const categoryTotals = this.expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
      return acc;
    }, {} as Record<string, number>);

    this.chart.data.labels = Object.keys(categoryTotals);
    this.chart.data.datasets[0].data = Object.values(categoryTotals);
    this.chart.update();
  }

  logout(): void {
    this.authService.logout();
  }
}
