import { Router } from '@angular/router'; 
import { Component } from '@angular/core'; 
import { MatTableDataSource } from '@angular/material/table'; 
import { AlertService } from 'src/app/public/services/alert/alert.service'; 
import { AuthService } from 'src/app/public/services/auth-service/account.services'; 
import { DashboardService } from '../services/dashboard.service'; 
 
 
 
 
 
 
 
@Component({ 
  selector: 'app-dashboard', 
  templateUrl: './dashboard.component.html', 
  styleUrls: ['./dashboard.component.scss'], 
 
}) 
export class DashboardComponent { 
 
 
 
  constructor( 
    private router: Router, 
    private alertService: AlertService, 
    private authService:AuthService, 
    private dashboardService:DashboardService 
  ) {} 
  displayedColumns: string[] = ['username', 'rank', 'score']; 
  dataSource: any; 
  currentUser:any; 
  scoreButtonStatus:boolean=false 
  showLoading:boolean=false 
 
  ngOnInit() { 
    this.authService.getCurrentUser().subscribe({ 
      next:(user)=>{ 
        this.currentUser = user 
 
      } 
 
    }) 
 
 
  } 
 
 
 
  handleLogout() 
  { 
    this.showLoading=true 
    this.authService.logout().subscribe({ 
      next:(res)=>{ 
        localStorage.removeItem("accessToken") 
        this.router.navigate(['../../']) 
        this.showLoading=false 
        this.alertService.showAlert("Logout","Successfully",3000) 
      }, 
      error:()=>{ 
        this.showLoading=false 
      } 
    }) 
  } 
  handleShowPlayer() 
  { 
    this.showLoading=true 
    this.dashboardService.getUserList().subscribe({ 
      next:(res:any)=>{ 
 
        console.log("data list",res) 
        const sortedUsers =res.users.sort((a:any, b:any) => a.highScore.score - b.highScore.score).reverse().map((user:any, index:any) => { 
 
          return { ...user, rank: index+1, score: user.highScore.score } 
        }); 
 
        this.dataSource = new MatTableDataSource(sortedUsers).data; 
        this.showLoading=false 
      }, 
      error:(error)=>{ 
        console.log(error) 
        this.showLoading=false 
      } 
    }) 
  } 
 
  handleCreateNewScore () 
  { 
    const randomNumber = Math.floor(Math.random() * 1001); 
    this.showLoading=true 
    this.dashboardService.generateScore({username:this.currentUser.username.toString(),score:randomNumber}).subscribe({ 
      next:(res)=>{ 
       this.alertService.showAlert("Generated Score","successfully",3000) 
       this.showLoading=false 
       this.handleShowPlayer() 
      }, 
      error:(error)=>{ 
        console.log(error) 
        this.showLoading=false 
      } 
    }) 
    this.scoreButtonStatus=true 
 
  } 
 
}