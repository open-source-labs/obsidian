import { gql } from "https://deno.land/x/oak_graphql/mod.ts";
//import {concatInlineFragments, parseFragmentToInlineFragment} from "https://deno.land/x/oak_graphql/graphql-tools/utils/fragments.ts";
import {print, visit} from "https://deno.land/x/graphql_deno/mod.ts";
export function restructure (value:any){

    console.log(value);
    const variables = value.variables || {};
    const operationName = value.operationName;
    console.log("Varivaris: ");
    console.log(variables);
    let ast = gql(value.query);
    console.log(ast);
    
    let fragments: {[key:string]:any} = {};
    let containsFrags:boolean = false;
    let existingFrags: {[key:string]:any}={};
    let existingVars: {[key:string]:any}={};

    const buildFragsVisitor = {
      FragmentDefinition:(node:any)=>{
        fragments[node.name.value]=node.selectionSet.selections;
        console.log("I'm entering a FragmentDefinition");
      }
    };
  
    const buildDefaultVarsVisitor = {
      VariableDefinition:(node:any)=>{
        console.log("vardef",node);
        if (node.defaultValue){
          console.log(`default value of ${node.variable.name.value}: `,node.defaultValue.value);
          if(!variables[node.variable.name.value]){
            variables[node.variable.name.value] = node.defaultValue.value;
          }
          console.log("varrrr",variables)
        }
  
    }
  };
  
  const rewriteVarsVistor = {
    VariableDefinition:(node:any)=>{
      return null;
    },
    Variable:(node:any)=>{
      if(variables.hasOwnProperty(node.name.value)){
        return {kind: "EnumValue", value: variables[node.name.value]};
        }
      }
  
  };
  
  
    const rewriteVisitor = {
      FragmentSpread:(node:any)=>{
        if(fragments.hasOwnProperty(node.name.value)){
  
          console.log("in the hole");
          console.log(node);
          console.log(fragments[node.name.value]);
          return fragments[node.name.value];
        }
      },
    };
  
    const clearFragVisitor = {
    FragmentDefinition:(node:any)=>{
        if(fragments.hasOwnProperty(node.name.value)){
          return null;
        }
      }
    }
    const checkFragmentationVisitor = {
      FragmentSpread:(node:any)=>{
        console.log("mic check");
        containsFrags = true;
        existingFrags[node.name.value]=true
      },
      Variable:(node:any)=>{
        containsFrags = true;
        existingVars[node.name.value]=true
      }
    }
  
    const firstBuildVisitor = {
      ...buildFragsVisitor,
      ...buildDefaultVarsVisitor
    };
    
    
    const firstRewriteVisitor={
    ...rewriteVisitor,
    ...rewriteVarsVistor,
    OperationDefinition:(node:any)=>{
      if(operationName&&node.name.value!=operationName){return null}}
    };
  
    visit(ast, {leave:firstBuildVisitor});
  
    console.log("fragments",fragments);
    ast = gql(print(visit(ast,{leave:firstRewriteVisitor})));
  visit(ast,{leave:checkFragmentationVisitor});
  
  while(containsFrags){
    containsFrags=false;
    fragments={};
    visit(ast, {enter:buildFragsVisitor});
    console.log("Whiling away");
    ast = gql(print(visit(ast,{leave:firstRewriteVisitor})));
    visit(ast,{leave:checkFragmentationVisitor});
    console.log("fragments:",fragments,"containsFrags:",containsFrags);
    //if existingFrags has a key that fragments does not
    const exfragskeys=Object.keys(existingFrags);
    const fragskeys=Object.keys(fragments);
    const exvarsskeys=Object.keys(existingVars);
    const varkeys =Object.keys(variables);
    //exfragskeys.every(key=>fragskeys.includes(key))
    if (!exfragskeys.every(key=>fragskeys.includes(key))){
      console.log("We should be failing out");
      return console.log({error: 'missing fragment definitions'})
    }
    if (!exvarsskeys.every(key=>varkeys.includes(key))){
      console.log("We should be failing out");
      return console.log({error: 'missing variable definitions'})
    }
  }
  
  
    //YOU figure out how to replace one node with multiple nodes without
    //leaving an array in your wake, and that doesn't involve just doing the graphQL
    //equivalent of  parse(stringify).  I dare you.  I double dog dare you.
    //console.log("BEFORE WE NUKEM");
    console.log(print(ast));
    ast=visit(ast,{leave:clearFragVisitor})
    console.log("ALL OUT OF BUBBLEGUM:")
    console.log(print(ast));
    
  return print(ast);
}