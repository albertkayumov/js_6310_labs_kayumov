'use strict'

// ===== ЗАДАНИЕ 1: Базовый класс Vehicle =====
class Vehicle {
    static vehicleCount = 0
    // Создайте базовый класс Vehicle.
    // В конструкторе принимайте и сохраняйте в this свойства: 
    // make (марка), model (модель), year (год выпуска).
    constructor(make, model, year) {
        if ((typeof make !== 'string') || (typeof model !== 'string') || (typeof year !== 'number') || (year < 1886) || (!Number.isInteger(year))) {
            throw new Error('Некорректно введены параметры автомобиля')
        }
        if (year > new Date().getFullYear()) {
            throw new Error('Год выпуска не может быть больше текущего')
        }
        Vehicle.vehicleCount++

        this.make = make;
        this.model = model;
        this._year = year
    }

    // Добавьте метод displayInfo(), который выводит в консоль информацию 
    // о транспортном средстве в формате: "Марка: [make], Модель: [model], Год: [year]".
    displayInfo() {
        console.log(`Марка: ${this.make}, Модель: ${this.model}, Год: ${this._year}`)
    }

    // Добавьте геттер age, который возвращает возраст транспортного средства 
    // (текущий год минус год выпуска). Используйте new Date().getFullYear().
    get age() {
        return new Date().getFullYear() - this._year
    }

    // Добавьте сеттер для года выпуска с проверкой: год не может быть больше текущего.
    set year(newYear) {
        if (typeof newYear !== 'number' || newYear < 1886 || !Number.isInteger(newYear)) {
            throw new Error('Новый год выпуска должен быть целым числом не меньше 1886')
        }
        if (newYear > new Date().getFullYear()) {
            throw new Error("Новый год выпускка не может быть больше текущего")
        }
        this._year = newYear
    }

    get year() {
        return this._year;
    }

    // Добавьте статический метод compareAge(vehicle1, vehicle2), 
    // который возвращает разницу в возрасте между двумя транспортными средствами.
    static compareAge(vehicle1, vehicle2) {
        if (!vehicle1 || !vehicle2) {
            return 'Ошибка создания транспортного средства для класса Vehicle'
        }
        if (!(vehicle1 instanceof Vehicle) || !(vehicle2 instanceof Vehicle)) {
            return 'Параметры не являются экземплярами класса Vehicle'
        }
        return Math.abs(vehicle1.age - vehicle2.age)

    }

    static getTotalVehicles() {
        return Vehicle.vehicleCount;
    }
}


// ===== ЗАДАНИЕ 2: Класс Car (наследуется от Vehicle) =====
class Car extends Vehicle {
    // Создайте дочерний класс Car, который наследуется от Vehicle.
    // Добавьте новое свойство numDoors (количество дверей).
    constructor(make, model, year, numDoors) {
        if (typeof numDoors !== 'number' || numDoors < 1 || !Number.isInteger(numDoors)) {
            throw new Error('Некорректно введены параметры автомобиля')
        }
        super(make, model, year)
        this.numDoors = numDoors
    }

    // Переопределите метод displayInfo() так, чтобы он также выводил количество дверей. 
    // Используйте super.displayInfo() для вызова метода родителя.
    displayInfo() {
        super.displayInfo()
        console.log(`Количество дверей: ${this.numDoors}`)
    }

    // Добавьте метод honk(), который выводит "Beep beep!".
    honk() {
        console.log("Beep beep!")
    }
}

// ===== ЗАДАНИЕ 3: Класс ElectricCar (наследуется от Car) =====
class ElectricCar extends Car {
    // Создайте дочерний класс ElectricCar, который наследуется от Car.
    // Добавьте новое свойство batteryCapacity (емкость батареи в кВт·ч).
    constructor(make, model, year, numDoors, batteryCapacity) {
        if (typeof batteryCapacity !== 'number' || batteryCapacity < 1) {
            throw new Error('Некорректно введены параметры автомобиля (батарея)')
        }
        super(make, model, year, numDoors)
        this.batteryCapacity = batteryCapacity
    }

    // Переопределите метод displayInfo() для вывода дополнительной информации о батарее.
    displayInfo() {
        super.displayInfo()
        console.log(`Емкость батареи: ${this.batteryCapacity}`)
    }

    // Добавьте метод calculateRange(), который рассчитывает примерный запас хода 
    // (предположим, что 1 кВт·ч = 6 км).
    calculateRange() {
        return this.batteryCapacity * 6
    }
}


// ===== ЗАДАНИЕ 4: Каррирование =====

// Создайте функцию createVehicleFactory, которая возвращает функцию 
// для создания транспортных средств определенного типа (каррирование).
const createVehicleFactory = (vehicleType) => (make, model, year, ...additionalArgs) => {
    return new vehicleType(make, model, year, ...additionalArgs);
};


// ===== ЗАДАНИЕ 5: Статические методы и свойства =====

// Добавьте статическое свойство vehicleCount в класс Vehicle 
// для подсчета количества созданных транспортных средств.
// Модифицируйте конструктор Vehicle для увеличения счетчика
// (добавьте в начало конструктора: Vehicle.vehicleCount++);
// Создайте статический метод getTotalVehicles(), 
// который возвращает общее количество созданных транспортных средств.


// Автоматические тесты
function runTests() {
    console.log('Запуск тестов...');

    // Расширьте тесты для полного покрытия задания.
    // ЗАДАНИЕ 1
    //конструктор
    console.log('ЗАДАНИЕ 1');

    const vehicle = new Vehicle('Toyota', 'Camry', 2015);
    try {
        new Vehicle('Toyota', 'Camry', '2015')
    } catch (error) {
        console.assert(error.message === 'Некорректно введены параметры автомобиля', 'Тест создания транcпорта провален')
    }
    try {
        new Vehicle(4, 'Camry', 2020)
    } catch (error) {
        console.assert(error.message === 'Некорректно введены параметры автомобиля', 'Тест создания транcпорта провален')
    }
    try {
        new Vehicle('Toyota', 4, 2020)
    } catch (error) {
        console.assert(error.message === 'Некорректно введены параметры автомобиля', 'Тест создания транcпорта провален')
    }
    try {
        new Vehicle('Toyota', 'Camry', 2030)
    } catch (error) {
        console.assert(error.message === 'Год выпуска не может быть больше текущего', 'Тест создания транспорта провален')
    }
    try {
        new Vehicle('Toyota', 'Camry', 1800)
    } catch (error) {
        console.assert(error.message === 'Некорректно введены параметры автомобиля', 'Тест создания транспорта провален')
    }
    try {
        new Vehicle('Toyota', 'Camry', 2002.5)
    } catch (error) {
        console.assert(error.message === 'Некорректно введены параметры автомобиля', 'Тест создания транспорта провален')
    }
    vehicle.displayInfo();

    console.log(`Возраст: ${vehicle.age} лет`);

    //сеттер
    try {
        vehicle.year = '2020';
    } catch (error) {
        console.assert(error.message === 'Новый год выпуска должен быть целым числом не меньше 1886', "1Тест установления нового года выпуска провален")
    }
    try {
        vehicle.year = 1400;
    } catch (error) {
        console.assert(error.message === 'Новый год выпуска должен быть целым числом не меньше 1886', "1Тест установления нового года выпуска провален")
    }
    try {
        vehicle.year = 1900.4;
    } catch (error) {
        console.assert(error.message === 'Новый год выпуска должен быть целым числом не меньше 1886', "1Тест установления нового года выпуска провален")
    }
    try {
        vehicle.year = 2026;
    } catch (error) {
        console.assert(error.message === "Новый год выпускка не может быть больше текущего", "2Тест установления нового года выпуска провален")
    }
    try {
        vehicle.year = 2025;
    } catch (error) {
        console.assert(error.message === "Новый год выпускка не может быть больше текущего", "2Тест установления нового года выпуска провален")
    }
    console.log(`Новый установленный год: ${vehicle.year}`)
    console.log(`Новый возраст: ${vehicle.age}`)

    //compare
    let vehicle_1
    let vehicle_2
    let vehicle_car1
    let vehicle_car2
    let a

    try {
        vehicle_1 = new Vehicle('Porsche', '911', 2022)
    } catch (error) {
        console.assert(error.message === 'Некорректно введены параметры автомобиля', 'Тест создания транcпорта провален')
    }
    try {
        vehicle_2 = new Vehicle('MINI Cooper', 'R59', 2012)
    } catch (error) {
        console.assert(error.message === 'Некорректно введены параметры автомобиля', 'Тест создания транcпорта провален')
    }

    try {
        vehicle_car1 = new Car('MINI Cooper', 'R59', 2012)
    } catch (error) {
        console.assert(error.message === 'Некорректно введены параметры автомобиля', 'Тест создания транcпорта 2 провален')
    }
    try {
        vehicle_car2 = new Car('MINI Cooper', 'R59', 2012)
    } catch (error) {
        console.assert(error.message === 'Некорректно введены параметры автомобиля', 'Тест создания транcпорта 2 провален')
    }
    try {
        a = new Vehicle(2)
    } catch (error) {
        console.assert(error.message === 'Некорректно введены параметры автомобиля', 'Тест создания транcпорта 2 провален')
    }

    console.assert(Vehicle.compareAge(vehicle_1, vehicle_2) === 10, 'Тест разницы в возрасте провален')

    console.assert(Vehicle.compareAge(vehicle_1, vehicle_car2) === 'Ошибка создания транспортного средства для класса Vehicle', 'Тест разницы в возрасте провален')
    console.assert(Vehicle.compareAge(vehicle_car1, vehicle_2) === 'Ошибка создания транспортного средства для класса Vehicle', 'Тест разницы в возрасте провален')
    console.assert(Vehicle.compareAge(vehicle_car1, vehicle_car2) === 'Ошибка создания транспортного средства для класса Vehicle', 'Тест разницы в возрасте провален')
    console.assert(Vehicle.compareAge(a, vehicle_1) === 'Ошибка создания транспортного средства для класса Vehicle', 'Тест разницы в возрасте провален')

    console.assert(Vehicle.compareAge(3, 4) === 'Параметры не являются экземплярами класса Vehicle', 'Тест разницы в возрасте провален')
    console.assert(Vehicle.compareAge(vehicle_1, 4) === 'Параметры не являются экземплярами класса Vehicle', 'Тест разницы в возрасте провален')
    console.assert(Vehicle.compareAge(3, vehicle_2) === 'Параметры не являются экземплярами класса Vehicle', 'Тест разницы в возрасте провален')

    console.log(`Разница в возрасте "${vehicle_1.make}" и "${vehicle_2.make}":`, Vehicle.compareAge(vehicle_1, vehicle_2))

    // ЗАДАНИЕ 2
    console.log('ЗАДАНИЕ 2');

    const car = new Car('Honda', 'Civic', 2018, 4);
    let cartest1
    let cartest2
    let cartest3

    try {
        cartest1 = new Car('Honda', 'Civic', 2018, -4)
    } catch (error) {
        console.assert(error.message === 'Некорректно введены параметры автомобиля', "Тест добавления машины провален")
    }
    try {
        cartest2 = new Car('Honda', 'Civic', 2018, '4')
    } catch (error) {
        console.assert(error.message === 'Некорректно введены параметры автомобиля', "Тест добавления машины провален")
    }
    try {
        cartest3 = new Car('Honda', 'Civic', 2018, 4.5)
    } catch (error) {
        console.assert(error.message === 'Некорректно введены параметры автомобиля', "Тест добавления машины провален")
    }

    car.displayInfo();
    car.honk();

    //ЗАДАНИЕ 3
    console.log('ЗАДАНИЕ 3');

    const electricCar = new ElectricCar('Tesla', 'Model 3', 2020, 4, 75);
    let elecrictest1
    let elecrictest2
    try {
        elecrictest1 = new ElectricCar('Tesla', 'Model 3', 2020, 4, '75')
    } catch (error) {
        console.assert(error.message === 'Некорректно введены параметры автомобиля (батарея)', "Тест добавления машины провален")
    }
    try {
        elecrictest2 = new ElectricCar('Tesla', 'Model 3', 2020, 4, -75)
    } catch (error) {
        console.assert(error.message === 'Некорректно введены параметры автомобиля (батарея)', "Тест добавления машины провален")
    }
    electricCar.displayInfo();
    console.log(`Запас хода: ${electricCar.calculateRange()} км`);

    // Проверка возраста
    const testVehicle = new Vehicle('Test', 'Model', 2010);
    console.assert(testVehicle.age === (new Date().getFullYear() - 2010), 'Тест возраста провален');

   //ЗАДАНИЕ 4

    console.log('ЗАДАНИЕ 4');

    const createVehicle = createVehicleFactory(Vehicle);
    const factoryVehicle = createVehicle('Factory', 'Basic', 2019);
    console.log('Создан Vehicle через фабрику:');
    factoryVehicle.displayInfo();

    const createCarFactory = createVehicleFactory(Car);
    const myNewCar = createCarFactory('BMW', 'X5', 2022, 5);
    console.log('Создан новый Car через фабрику:');
    myNewCar.displayInfo();

    const createElectricCarFactory = createVehicleFactory(ElectricCar);
    const myNewElectricCar = createElectricCarFactory('Nissan', 'Leaf', 2021, 5, 40);
    console.log('Создан новый ElectricCar через фабрику:');
    myNewElectricCar.displayInfo();


    const car3Doors = createCarFactory('Mini', 'Cooper', 2020, 3);
    console.log('Car с 3 дверями через фабрику:');
    car3Doors.displayInfo();

    // Задание 5

    console.log('ЗАДАНИЕ 5')

    console.log('Всего создано транспортных средств:', Vehicle.getTotalVehicles());
    console.assert(Vehicle.getTotalVehicles() === 10, 'Тест подсчета количества созданных ТС провален')

    console.log('Все тесты пройдены! ✅');
}

runTests();