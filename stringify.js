//Реализуйте и экспортируйте по умолчанию функцию, похожую на JSON.stringify(), но со следующими отличиями:

//ключи и строковые значения должны быть без кавычек;
//строчка (линия) в строке заканчивается самим значением, без запятой.

//stringify(value[, replacer[, spacesCount]])
//Параметры:
//    value
//        Значение, преобразуемое в строку.
//    replacer, необязательный
//        Строка - отступ для ключа; Значение по умолчанию - один пробел.
//    spacesCount, необязательный
//        Число - количество повторов отступа ключа. Значение по умолчанию - 1.

// алгоритм решения:
// 1). проверить это строка или объект
// 2). если примитивны тип данных (строка/булево/число) то возвращем результат (преобразованное к строке значение булево/число/строка) 
// 3). получить массив ключей и значений
// 3.0) добавить символ replacer столько такое количество раз как указанно в spacesCount
// 3.1) ключ добавить в результирующую строку
// 3.2) для значения вызвать эту же функцию с первым параметром = значению, остальные параметры = входным параметрам этого вызова функции

const stringify = (value, replacer = ' ', spacesCount = 1, deep = 1) =>{
    if (typeof value !== 'object') return String(value);
    const someReplacer = replacer.repeat(spacesCount * deep);
    const resaltValue = Object.entries(value).reduce((acc, [keyArr, valueArr]) => {
        acc.push(`${someReplacer}${keyArr}: ${stringify(valueArr, replacer, spacesCount, deep + 1)}\n`);
        return acc;
    },['{\n']);
    if (spacesCount * deep > 1){
        const someReplacerWithoutLast = replacer.repeat(spacesCount * deep - spacesCount);
        resaltValue.push(`${someReplacerWithoutLast}}`);
    } else {
        resaltValue.push('}');
    }
    return resaltValue.join('');
};

//export default stringify;

//console.log(stringify('hello')); // hello - значение приведено к строке, но не имеет кавычек
//console.log(stringify(true)); // true - значение приведено к строке, но не имеет кавычек
//console.log(stringify(42)); // true - значение приведено к строке, но не имеет кавычек

//const data = {hello:'world', is:true, nested:{count:5}};
const nested = {
    string: 'value',
    boolean: true,
    number: 5,
    float: 1.25,
    object: {
      5: 'number',
      1.25: 'float',
      null: 'null',
      true: 'boolean',
      value: 'string',
      nested: {
        boolean: true,
        float: 1.25,
        string: 'value',
        number: 5,
        null: 'null',
      },
    },
  };
//console.log(stringify(data, '_', 3));
//console.log(stringify(data, '|-', 2));
console.log(stringify(nested,'_',3));