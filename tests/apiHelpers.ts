import { APIRequestContext } from "@playwright/test";


export class APIHelper{
    
    // static getAllRoomPosts(request: APIRequestContext) {
    //   throw new Error('Method not implemented.');
    // }
    // private baseUrl: string;

    // constructor(baseUrl: string){
    //     this.baseUrl = baseUrl;
    // }

    // localhost:3000/posts/{ID}
    //POST, GET, PUT, DELETE
    async getAllRoomPosts(request: APIRequestContext) {
        const response = await request.get(`http://localhost:3000/rooms`);
        return response;
    }

    // GET ALL CLIENTS
    async getAllClients(request: APIRequestContext) {
        const response = await request.get(`http://localhost:3000/clients`);
        return response;
    }


  
    
}