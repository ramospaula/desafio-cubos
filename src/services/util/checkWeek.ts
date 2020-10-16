export function valideWeek(data: any): boolean{

    let arrayWeek = [0, 1, 2, 3, 4, 5, 6];

    let weekDay = data.weekDay;

    let foundWeek = weekDay.every( (week: any) => { 
        return arrayWeek.includes(week)
    });

    return foundWeek;

}