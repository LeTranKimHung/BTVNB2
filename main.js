
let Student = function (name, family, age, scores, birth) {
    this.name = name;
    this.family = family;
    this.age = age;
    this.scores = scores;
    this.birth = birth;
    this.getFullName = function () {
        return this.family + " " + this.name
    },
        this.getFullBirthDay = function () {
            return `${this.birth.day}/${this.birth.month}/${this.birth.year}`
        },
        this.getAVGScore = function () {
            return this.scores.reduce(
                function (sum, e) {
                    return sum += e
                }
            ) / this.scores.length;
        }
}
let DateO = function (year, month, day) {
    this.year = year;
    this.month = month;
    this.day = day
}
let student1 = new Student("Tung", "Nguyen", 18, [10, 9, 8], new DateO(2008, 1, 1))
let student2 = new Student("Toan", "Bui", 18, [7, 6, 3], new DateO(2008, 1, 1))
let student3 = new Student("Tung", "Nguyen", 20, [4, 3, 2], new DateO(2006, 1, 1))
let student4 = new Student("Tung", "Bui", 20, [4, 3, 2], new DateO(2006, 1, 1))
let array = [];
(a, b) => a + b
array.push(student1);
array.push(student2);
array.push(student3);
array.push(student4);
let result = array.map(
    (e) => ({
        fullName: e.getFullName(),
        birth: e.getFullBirthDay(),
        AVGScore: e.getAVGScore()
    })
)
result = array.find(
    function (e) {
        for (const score of e.scores) {
            if (score < 2) {
                return true;
            }
        }
    }
)
array.sort(
    function (a, b) {
        if (a.name.toLowerCase() == b.name.toLowerCase()) {
            if (a.family.toLowerCase() == b.family.toLowerCase()){
                return a.age-b.age;
            }
            return a.family.toLowerCase().localeCompare(b.family.toLowerCase())
        }
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    }
)
console.log(array);
//map,sort,filter,every, reduce,some