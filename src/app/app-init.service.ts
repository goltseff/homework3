import {Injectable} from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable()
export class InitTagsService {
    public tags = [];

    constructor(private httpClient: HttpClient) {}

    loadTags(): Promise<void> {
        return this.httpClient.get('/assets/resourses/tags.json')
        .toPromise()
        .then((data: string[]) => {
            this.tags = data;
        });

    }
}
