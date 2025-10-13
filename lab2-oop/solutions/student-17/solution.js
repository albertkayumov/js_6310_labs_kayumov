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
            throw new Error("Новый год выпуска не может быть больше текущего")
        }
        this._year = newYear
    }

    get year() {
        return this._year;
    }

    // Добавьте статический метод compareAge(vehicle1, vehicle2), 
    // который возвращает разницу в возрасте между двумя транспортными средствами.
    static compareAge(vehicle1, vehicle2) {
        // Более точные проверки
        if (vehicle1 === null || vehicle1 === undefined || 
            vehicle2 === null || vehicle2 === undefined) {
            return 'Оба параметра должны быть указаны'
        }
        
        // Разрешаем сравнивать любые наследники Vehicle
        if (!(vehicle1 instanceof Vehicle) || !(vehicle2 instanceof Vehicle)) {
            return 'Оба параметра должны быть экземплярами класса Vehicle или его наследников'
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
        super(make, model, year, numDoors)
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
    Vehicle.vehicleCount = 0; // Сброс счетчика для чистых тестов

    // ЗАДАНИЕ 1: Vehicle
    console.log('\n=== ЗАДАНИЕ 1: Vehicle ===');
    
    // Тесты конструктора Vehicle
    console.log('Тесты конструктора:');
    const vehicle = new Vehicle('Toyota', 'Camry', 2015);
    
    // Негативные тесты конструктора
    const invalidTests = [
        { make: 'Toyota', model: 'Camry', year: '2015', expected: 'Некорректно введены параметры автомобиля' },
        { make: 4, model: 'Camry', year: 2020, expected: 'Некорректно введены параметры автомобиля' },
        { make: 'Toyota', model: 4, year: 2020, expected: 'Некорректно введены параметры автомобиля' },
        { make: 'Toyota', model: 'Camry', year: 2030, expected: 'Год выпуска не может быть больше текущего' },
        { make: 'Toyota', model: 'Camry', year: 1800, expected: 'Некорректно введены параметры автомобиля' },
        { make: 'Toyota', model: 'Camry', year: 2002.5, expected: 'Некорректно введены параметры автомобиля' }
    ];
    
    invalidTests.forEach(test => {
        try {
            new Vehicle(test.make, test.model, test.year);
            console.assert(false, `Тест должен был выбросить ошибку для ${JSON.stringify(test)}`);
        } catch (error) {
            console.assert(error.message === test.expected, `Тест конструктора провален: ${error.message}`);
        }
    });

    // Тест displayInfo
    console.log('Тест displayInfo:');
    vehicle.displayInfo();

    // Тест геттера age
    console.log('Тест возраста:');
    console.log(`Возраст: ${vehicle.age} лет`);
    console.assert(vehicle.age === (new Date().getFullYear() - 2015), 'Тест возраста провален');

    // Тесты сеттера year
    console.log('Тесты сеттера года:');
    const yearTests = [
        { year: '2020', expected: 'Новый год выпуска должен быть целым числом не меньше 1886' },
        { year: 1400, expected: 'Новый год выпуска должен быть целым числом не меньше 1886' },
        { year: 1900.4, expected: 'Новый год выпуска должен быть целым числом не меньше 1886' },
        { year: 2030, expected: 'Новый год выпуска не может быть больше текущего' }
    ];

    yearTests.forEach(test => {
        // Создаем новый объект для каждого теста
        const testVehicle = new Vehicle('Test', 'Model', 2015);
        try {
            testVehicle.year = test.year;
            console.assert(false, `Тест сеттера должен был выбросить ошибку для года ${test.year}`);
        } catch (error) {
            console.assert(error.message === test.expected, `Тест сеттера провален для года ${test.year}: ${error.message}`);
        }
    });

    // Отдельный тест для корректного изменения
    const workingVehicle = new Vehicle('Working', 'Model', 2010);
    workingVehicle.year = 2020;
    console.assert(workingVehicle.year === 2020, 'Тест установки корректного года провален');
    console.log(`Новый установленный год: ${workingVehicle.year}`);
    console.log(`Новый возраст: ${workingVehicle.age}`);

    // Тесты compareAge
    console.log('Тесты compareAge:');
    const vehicle1 = new Vehicle('Porsche', '911', 2022);
    const vehicle2 = new Vehicle('MINI Cooper', 'R59', 2012);
    const car1 = new Car('BMW', 'X5', 2015, 5);
    const electricCar1 = new ElectricCar('Tesla', 'Model S', 2020, 4, 100);

    // Позитивные тесты compareAge
    console.assert(Vehicle.compareAge(vehicle1, vehicle2) === 10, 'Тест разницы между Vehicle провален');
    console.assert(Vehicle.compareAge(vehicle1, car1) === 7, 'Тест Vehicle и Car провален');
    console.assert(Vehicle.compareAge(car1, electricCar1) === 5, 'Тест Car и ElectricCar провален');

    // Негативные тесты compareAge
    console.assert(Vehicle.compareAge(null, vehicle1) === 'Оба параметра должны быть указаны', 'Тест с null провален');
    console.assert(Vehicle.compareAge(vehicle1, undefined) === 'Оба параметра должны быть указаны', 'Тест с undefined провален');
    console.assert(Vehicle.compareAge(3, 4) === 'Оба параметра должны быть экземплярами класса Vehicle или его наследников', 'Тест с числами провален');
    console.assert(Vehicle.compareAge(vehicle1, {}) === 'Оба параметра должны быть экземплярами класса Vehicle или его наследников', 'Тест с объектом провален');
    console.assert(Vehicle.compareAge('string', vehicle2) === 'Оба параметра должны быть экземплярами класса Vehicle или его наследников', 'Тест со строкой провален');

    console.log(`Разница в возрасте "${vehicle1.make}" и "${vehicle2.make}": ${Vehicle.compareAge(vehicle1, vehicle2)}`);

    // ЗАДАНИЕ 2: Car
    console.log('\n=== ЗАДАНИЕ 2: Car ===');
    
    // Тесты конструктора Car
    const car = new Car('Honda', 'Civic', 2018, 4);
    
    // Негативные тесты конструктора Car
    const invalidCarTests = [
        { make: 'Honda', model: 'Civic', year: 2018, doors: -4, expected: 'Некорректно введены параметры автомобиля' },
        { make: 'Honda', model: 'Civic', year: 2018, doors: '4', expected: 'Некорректно введены параметры автомобиля' },
        { make: 'Honda', model: 'Civic', year: 2018, doors: 4.5, expected: 'Некорректно введены параметры автомобиля' },
        { make: 'Honda', model: 'Civic', year: 2018, doors: 0, expected: 'Некорректно введены параметры автомобиля' }
    ];
    
    invalidCarTests.forEach(test => {
        try {
            new Car(test.make, test.model, test.year, test.doors);
            console.assert(false, `Тест Car должен был выбросить ошибку для ${JSON.stringify(test)}`);
        } catch (error) {
            console.assert(error.message === test.expected, `Тест конструктора Car провален: ${error.message}`);
        }
    });

    // Тесты методов Car
    console.log('Тест displayInfo Car:');
    car.displayInfo();
    
    console.log('Тест honk:');
    car.honk();

    // ЗАДАНИЕ 3: ElectricCar
    console.log('\n=== ЗАДАНИЕ 3: ElectricCar ===');
    
    const electricCar = new ElectricCar('Tesla', 'Model 3', 2020, 4, 75);
    
    // Негативные тесты конструктора ElectricCar
    const invalidElectricTests = [
        { make: 'Tesla', model: 'Model 3', year: 2020, doors: 4, battery: '75', expected: 'Некорректно введены параметры автомобиля (батарея)' },
        { make: 'Tesla', model: 'Model 3', year: 2020, doors: 4, battery: -75, expected: 'Некорректно введены параметры автомобиля (батарея)' },
        { make: 'Tesla', model: 'Model 3', year: 2020, doors: 4, battery: 0, expected: 'Некорректно введены параметры автомобиля (батарея)' }
    ];
    
    invalidElectricTests.forEach(test => {
        try {
            new ElectricCar(test.make, test.model, test.year, test.doors, test.battery);
            console.assert(false, `Тест ElectricCar должен был выбросить ошибку для ${JSON.stringify(test)}`);
        } catch (error) {
            console.assert(error.message === test.expected, `Тест конструктора ElectricCar провален: ${error.message}`);
        }
    });

    // Тесты методов ElectricCar
    console.log('Тест displayInfo ElectricCar:');
    electricCar.displayInfo();
    
    console.log('Тест calculateRange:');
    const range = electricCar.calculateRange();
    console.log(`Запас хода: ${range} км`);
    console.assert(range === 450, 'Тест расчета запаса хода провален');
    console.assert(electricCar.calculateRange() === electricCar.batteryCapacity * 6, 'Тест формулы расчета провален');

    // ЗАДАНИЕ 4: Фабрика
    console.log('\n=== ЗАДАНИЕ 4: Фабрика ===');
    
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

    // Тест фабрики с некорректными параметрами
    try {
        createCarFactory('Invalid', 'Car', 2020, -2);
        console.assert(false, 'Фабрика должна была выбросить ошибку');
    } catch (error) {
        console.assert(error.message === 'Некорректно введены параметры автомобиля', 'Тест фабрики с ошибкой провален');
    }

    // ЗАДАНИЕ 5: Статические методы и свойства
    console.log('\n=== ЗАДАНИЕ 5: Статические методы ===');
    
    const initialCount = Vehicle.getTotalVehicles();
    console.log(`Всего создано транспортных средств: ${initialCount}`);
    
    // Создаем еще несколько для проверки счетчика
    new Vehicle('Test1', 'Model1', 2010);
    new Car('Test2', 'Model2', 2011, 4);
    new ElectricCar('Test3', 'Model3', 2012, 4, 50);
    
    const finalCount = Vehicle.getTotalVehicles();
    console.log(`После создания дополнительных ТС: ${finalCount}`);
    console.assert(finalCount === initialCount + 3, 'Тест подсчета количества созданных ТС провален');

    // Дополнительные тесты наследования
    console.log('\n=== Дополнительные тесты наследования ===');
    
    // Проверка instanceof
    console.assert(car1 instanceof Vehicle, 'Car должен быть instanceof Vehicle');
    console.assert(car1 instanceof Car, 'Car должен быть instanceof Car');
    console.assert(electricCar1 instanceof Vehicle, 'ElectricCar должен быть instanceof Vehicle');
    console.assert(electricCar1 instanceof Car, 'ElectricCar должен быть instanceof Car');
    console.assert(electricCar1 instanceof ElectricCar, 'ElectricCar должен быть instanceof ElectricCar');

    // Проверка, что методы работают корректно через наследование
    console.assert(typeof car1.honk === 'function', 'Car должен иметь метод honk');
    console.assert(typeof electricCar1.calculateRange === 'function', 'ElectricCar должен иметь метод calculateRange');
    console.assert(typeof electricCar1.honk === 'function', 'ElectricCar должен наследовать метод honk');

    console.log('\n✅ Все тесты пройдены!');
}

// Запуск тестов
runTests();