import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { IUser } from "../interfaces/user/user.interface";

@Injectable({
    providedIn: "root",
})
export class UpdateUserService {

    getUpdateUser(newUser: IUser): Observable<IUser> {
        return new Observable<{ status: number, body: IUser }>((observable) => {
            observable.next({ status: 200, body: structuredClone(newUser)});
            observable.complete();
        })
        .pipe(map((updateUserResponse: { status: number, body: IUser }) => updateUserResponse.body));
    }
}