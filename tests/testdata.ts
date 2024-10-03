import { faker } from '@faker-js/faker';
import { equal } from 'assert';


export function generateUserData() {
    return {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
    };
}
// Create testdata for room
export function generateRoomData() {
    return {
        // category: faker
        roomcategory: faker.helpers.arrayElement(['Double', 'Single', 'Twin']),
        // roomnumber is between 1 to 10
        roomnumber: faker.number.int({ min: 1, max: 10 }),
        // floornumber is between 1 to 5
        floornumber: faker.number.int({ min: 1, max: 5 }), 
        // available 
        roomavailable: faker.datatype.boolean(0.5),
        // price is between 100 to 1000
        roomprice: faker.number.int({ min: 100, max: 1000 }),
        // features
        roomfeatures: faker.helpers.arrayElements(['Balcony', 'Ensuite', 'Sea View', 'Penthouse'])
    };
}
export function generateClientData() {
    return {
        clientname: faker.person.fullName(),
        clientemail: faker.internet.email(),
        clientphonenumber:generateTelephoneNumber(),
    };
}
export function generateTelephoneNumber() {
    const areaCode = '07' + faker.string.numeric(1); // Generats the first bit of a swedish phonenumber 070, 073, 076, etc.
    const firstPart = faker.string.numeric(3);       // First bit for example 123
    const secondPart = faker.string.numeric(2);      // Second bit for example 45
    const thirdPart = faker.string.numeric(2);      // Third bit for example 67

    return `${areaCode}-${firstPart} ${secondPart} ${thirdPart}`;
    };
 
        export function generateBillData() {
            return {
        billvalue: faker.number.int({ min: 10, max: 1000000000 }),
        billclick: faker.datatype.boolean(0.5),

        };
}
        export function generateReservationData() {
            let reservationStart =faker.date.future();
            let reservationEnd = new Date (reservationStart);
            // reservationEnd.setDate(reservationEnd.getDate()+2);

            reservationEnd.setDate(reservationEnd.getDate()+faker.number.int({ min: 1, max: 30}));
            console.log("Start",reservationStart);
            console.log("End",reservationEnd);

            ///let date = new Date();
            let date=faker.date.future();
            console.log("Date",date);

            let date1 =new Date(date);
            
            // Addera två dagar
            date1.setDate(date1.getDate() + 2);

            // Skriv ut det nya datumet
            console.log("Date",date);
            console.log("Date1",date1);
            
            return {
                reservationStart: convertDateToString(reservationStart),
                reservationEnd: convertDateToString(reservationEnd), //kan ej ha ett datum innan start
                reservationclient: faker.number.int({ min: 0, max: 5 }),
                reservationroom: faker.number.int({ min: 0, max: 5 }),
                reservationbill: faker.number.int({ min: 0, max: 5 }),
                

            };
        }
        export function convertDateToString(date:Date): String {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate()
        let monthStr: string;
        // To get 0 in the month
        if (month < 10) {
            monthStr = "0" + String(month);
        } else {
            monthStr = String(month);
        }
        console.log("month",month,monthStr);
        // To get a 0 date between
        let dateStr: string;
        // To get 0 in the month
        if (day < 10) {
            dateStr = "0" + String(day);
        } else {
            dateStr = String(day);
        }
        console.log("day",day,dateStr);
        //const date = reservationStart.getDate();
        console.log("Full",year+"-"+monthStr+"-"+dateStr);
        return year+"-"+monthStr+"-"+dateStr; 
    };

    export function generateDates() {
        const reservationStart = faker.date.future();
        const year = reservationStart.getFullYear();
        const month = reservationStart.getMonth();
        const day = reservationStart.getDate()
        let monthStr: string;
        // To get 0 in the month
        if (month < 10) {
            monthStr = "0" + String(month);
        } else {
            monthStr = String(month);
        }
        console.log("month",month,monthStr);
        // To get a 0 date between
        let dateStr: string;
        // To get 0 in the month
        if (day < 10) {
            dateStr = "0" + String(day);
        } else {
            dateStr = String(day);
        }
        console.log("day",day,dateStr);
        //const date = reservationStart.getDate();
        console.log("Full",year+"-"+monthStr+"-"+dateStr);
        return year+"-"+monthStr+"-"+dateStr; 
    
    };



