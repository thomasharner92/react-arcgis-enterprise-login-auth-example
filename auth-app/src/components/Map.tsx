import { useRef, useEffect, useState } from "react";
import "./Map.scss";
import esriConfig from "@arcgis/core/config";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Home from "@arcgis/core/widgets/Home";
import { IAppConfig } from "../types/IAppConfig";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import Extent from "@arcgis/core/geometry/Extent";



interface IProps {
  config: IAppConfig;
}

export const Map = (props: IProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  if (props.config.app.portalUrl !== "") {
    esriConfig.portalUrl = props.config.app.portalUrl;
  }

  /*
  const webmapRef = useRef<WebMap>({} as any);
  const mapViewRef = useRef<MapView>({} as any);
  */
  const [webMap, setWebMap] = useState<WebMap | undefined>();
  const [mapView, setMapView] = useState<MapView | undefined>();
  const [homeWidget, setHomeWidget] = useState<Home>();

  const extentTracker = useRef<Extent[]>([]);
  let homeExtent : Extent;


  // when first loading the component, create our webmap and mapview
  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    // pull the portal item id from the config
    const webmap = new WebMap({
      portalItem: {
        id: props.config.map.mapId,
      },
    });
    // create a mapview around the webmap
    const view = new MapView({
      map: webmap,
      container: mapRef.current!,
    });

    // sample: adding a widget
    const hWidget = new Home({
      view,
    });
    view.ui.add(hWidget, "top-left");


    // capture the webmap and mapview on refs, so that if we want to add listeners, capture layers,
    // etc.; later on we have access to the objects outside this effect.
    /*webmapRef.current = webmap;
    mapViewRef.current = view;*/
    setMapView(view);
    setWebMap(webmap);
    setHomeWidget(hWidget);

  }, []);

  useEffect(() => {

    if (homeWidget){
        homeWidget.goToOverride = function() {
            mapView?.goTo(extentTracker.current[extentTracker.current.length - 2])
            
        }
    }
    
  }, [homeWidget])

  useEffect(()=> {

    if (mapView){
        extentTracker.current.push(mapView.extent)
        homeExtent = mapView.extent;

        // When the mapview extent gets set for the first time save it as the "homeExtent" for the home button
        reactiveUtils.whenOnce(
            () => mapView.extent != null)
            .then(() => {
              homeExtent = mapView.extent;
              console.log(homeExtent);
            });

        reactiveUtils.watch(
            () => mapView.stationary,
            (stationary) => {
                if (stationary) {
                    console.log(mapView.extent);
                    extentTracker.current.push(mapView.extent);
                } 
            }
        );
    }

  },[mapView])

  return (
    <div id="map-component">
      <div ref={mapRef}></div>
    </div>
  );
};