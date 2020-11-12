import { Component, OnInit,HostListener } from '@angular/core';

import {Champions} from '../../models/champions';
import {Traits} from '../../models/traits';
import {Items} from '../../models/items';

import * as championsJSON from '../../json/champions.json';
import * as traitsJSON from '../../json/traits.json';
import * as itemsJSON from '../../json/items.json';

@Component({
  selector: 'app-composition',
  templateUrl: './composition.component.html',
  styleUrls: ['./composition.component.css']
})
export class CompositionComponent implements OnInit {
  public champions:Array<Champions>;	
  public traits:Array<Traits>;
  public items:Array<Items>;
  public selected:Array<Champions>;
  public traits_selected;
  public trait_over_description;
  constructor() { 
    
    this.champions=(championsJSON as any).default as Array<Champions>;
    this.traits=(traitsJSON as any).default as Array<Traits>;
    this.items=(itemsJSON as any).default as Array<Items>;
    this.selected=[];
    this.traits_selected=new Map();
    

  }

  ngOnInit(): void {
  }
   @HostListener('document:mouseover', ['$event']) 
  onMouseOver(e) {
    var trait_over = document.getElementById("hovertrait");
    
    if(trait_over!=null){
       trait_over.style.left=e.clientX+"px";
       trait_over.style.top=e.clientY+"px";
      }
  }
  public over(trait) {
    this.trait_over_description=trait.description;
  }
  public out(){
    this.trait_over_description=null;
  }      
  getSubArrayCost(champs,cost){
    return champs.filter(champion=>{
        return champion.cost==cost;
      });
  }
  selectedChamp(champ){
    
    if( !this.selected.includes(champ)&&this.selected.length!=9){
      this.selected.push(champ);
      for(let traits_champ of champ.traits){
        let name_trait=this.traits.find(trait=>{
          return trait.key==traits_champ;
        });

        //key: value:[trait,1,icon_class]
        if(this.traits_selected.has(name_trait.name)){
          let trait_selected=this.traits_selected.get(name_trait.name);
          this.traits_selected.set(name_trait.name, [name_trait,trait_selected[1]+1,trait_selected[2]]);
        }
        else{
          this.traits_selected.set(name_trait.name,[name_trait,1,"default_icon"]);
        }
        let trait_mod=this.traits_selected.get(name_trait.name);
        let number_champs=trait_mod[1];
        for( let set of trait_mod[0].sets){
          let max=(set.max) ? set.max:9;
          if(set.min<=number_champs && number_champs<=max){
            this.traits_selected.set(name_trait.name,[trait_mod[0],trait_mod[1],set.style+"_icon"]);
          }
        }
      }  
    } 
  }
  deselectedChamp(champ){
    //lo elimino del array de seleccion
    let indice_del_champ=this.selected.indexOf(champ);
    this.selected.splice(indice_del_champ,1);
    //lo elimino de los traits
    for(let traits_champ of champ.traits){
      let name_trait=this.traits.find(trait=>{
          return trait.key==traits_champ;
      });

      let trait_delete=this.traits_selected.get(name_trait.name)
      let valor_trait=trait_delete[1]-1;
      let traits_set=trait_delete[0].sets;
     
      if(valor_trait==0){
        
       this.traits_selected.delete(name_trait.name);
      }
      else if(valor_trait<traits_set[0].min){
        //caso para el valor por defecto que no aplica ningun estilo
          this.traits_selected.set(name_trait.name,[trait_delete[0],valor_trait,"default_icon"]);
      }
      else{
        for( let set of traits_set){
          let max=(set.max) ? set.max:9;
          if(set.min<=valor_trait && valor_trait<=max){
            this.traits_selected.set(name_trait.name,[trait_delete[0],valor_trait,set.style+"_icon"]);
          }
        }
      }
    }
       
  } 
}
