import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Tournament }                from '../../models/tournament';
import { Sport }                from '../../models/sport';
import { TournamentType }       from '../../models/tournament-type';
import { TournamentService }         from '../../services/tournament.service';

@Component({
    selector: 'my-tournament',
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
    tournaments: Tournament[];
    selectedTournament: Tournament;

    constructor(
        private tournamentService: TournamentService,
        private router: Router) { }

    getTournaments(): void {
        this.tournamentService
            .getTournaments()
            .then(tournaments => this.tournaments = tournaments);
    }

    delete(tournament: Tournament): void {
        this.tournamentService
            .delete(tournament.id)
            .then(() => {
                this.tournaments = this.tournaments.filter(h => h !== tournament);
                if (this.selectedTournament === tournament) { this.selectedTournament = null; }
            });
    }

    ngOnInit(): void {
        this.getTournaments();
    }

    onSelect(tournament: Tournament): void {
        this.selectedTournament = tournament;
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedTournament.id]);
    }
}
