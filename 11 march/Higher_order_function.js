const Companies= [
    {name: " One", category: "Finance", start: 1981, end: 2004},
    {name: " Two", category: "Retail", start: 1992, end: 2008},
    {name: " Three", category: "Auto", start: 1999, end: 2007},
    {name: " Four", category: "Retail", start: 1989, end: 2010},
    {name: " Five", category: "Technology", start: 2009, end: 2014},
    {name: " Six", category: "Finance", start: 1987, end: 2010},
    {name: " Seven", category: "Auto", start: 1986, end: 1996},
    {name: " Eight", category: "Technology", start: 2011, end: 2016},
    {name: " Nine", category: "Retail", start: 1981, end: 1989}
  ];
  
  const age = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15,];
  //filter
  const catg=Companies.filter(function(categories){
      if(categories.category=="Finance"){
          return 1;
      }

  })
  const mapping =Companies.map(function(mapss){
    return `[${mapss.name}:${mapss.start}]`
  
})
const sorting =age.sort(function(sorts){
  return sorts.age;

})
const reducing =age.reduce(function(a,b){
  return a-b;

})
const catgo=Companies.filter(categories=>{if(categories.category=='Finance'){return 1}});
const maps=Companies.map(mapss=>{return`[${mapss.name}:${mapss.start}]`});
const sorts=age.sort(sorted=>{return sorted.age});
const reduces=age.reduce((a,b)=>{return a-b});

  console.log(catg)
  console.log(mapping)
  console.log(catgo)
  console.log(sorting)
  console.log(maps)
  console.log(reducing)
  console.log(sorts)
  console.log(reduces)
  
  