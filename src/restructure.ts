import { gql } from 'https://deno.land/x/oak_graphql/mod.ts';

import {print, visit} from "https://deno.land/x/graphql_deno/mod.ts";

/**
 * The restructure function:
 * - it converts the query string into an AST with the visitor pattern design.
 * - it handles fragments.
 * - it handles
 *
 * @param  {any} value - Query string
 * @return {string} string
 */
export function restructure (value:any){

   
    const variables = value.variables || {};
    const operationName = value.operationName;
   
    let ast = gql(value.query);
    
    
    let fragments: {[key:string]:any} = {};
    let containsFrags:boolean = false;
    let existingFrags: {[key:string]:any}={};
    let existingVars: {[key:string]:any}={};

    const buildFragsVisitor = {
      FragmentDefinition:(node:any)=>{
        fragments[node.name.value]=node.selectionSet.selections;
       
      }
    };  
    const buildDefaultVarsVisitor = {
      VariableDefinition:(node:any)=>{
        
        if (node.defaultValue){
          
          if(!variables[node.variable.name.value]){
            variables[node.variable.name.value] = node.defaultValue.value;
          }
         
        }
  
    }
  };

  const rewriteVarsVistor = {
    VariableDefinition: (node: any) => {
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
      if(operationName&&node.name.value!=operationName){return null}},
      InlineFragment:(node:any)=>{
              return [{
                kind: "Field",
                alias: undefined,
                name: { kind: "Name", value: "__typename" },
                arguments: [],
                directives: [],
                selectionSet: undefined
              },node]


      }
    };
  
    visit(ast, {leave:firstBuildVisitor});
  
    
    ast = gql(print(visit(ast,{leave:firstRewriteVisitor})));
  visit(ast,{leave:checkFragmentationVisitor});
  
  while(containsFrags){
    containsFrags=false;
    fragments={};
    visit(ast, {enter:buildFragsVisitor});
    
    ast = gql(print(visit(ast,{leave:firstRewriteVisitor})));
    visit(ast,{leave:checkFragmentationVisitor});
    
    //if existingFrags has a key that fragments does not
    const exfragskeys=Object.keys(existingFrags);
    const fragskeys=Object.keys(fragments);
    const exvarsskeys=Object.keys(existingVars);
    const varkeys =Object.keys(variables);
    //exfragskeys.every(key=>fragskeys.includes(key))
    if (!exfragskeys.every(key=>fragskeys.includes(key))){
      
      return console.log({error: 'missing fragment definitions'})
    }
    if (!exvarsskeys.every(key=>varkeys.includes(key))){
      
      return console.log({error: 'missing variable definitions'})
    }
  }

  
  ast = visit(ast, { leave: clearFragVisitor });
 
  return print(ast);
}
