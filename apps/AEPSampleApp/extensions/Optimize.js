/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.

@format
*/

import React, { useState } from 'react';
import { Button, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { AEPOptimize, DecisionScope } from '@adobe/react-native-aepoptimize';
import { WebView } from 'react-native-webview';
import styles from '../styles/styles';

export default ({ navigation }) => {

    const TARGET_OFFER_TYPE_TEXT = "text/plain";
    const TARGET_OFFER_TYPE_JSON = "application/json";
    const TARGET_OFFER_TYPE_HTML = "text/html";

    const [version, setVersion] = useState('0.0.0');
    const [textOffer, setTextOffer] = useState('Placeholder Text Offer!!');
    const [imageOffer, setImageOffer] = useState('https://blog.adobe.com/en/publish/2020/05/28/media_3dfaf748ad02bf771410a771def79c9ad86b1766.jpg');
    const [htmlOffer, setHtmlOffer] = useState('<html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><p>HTML place holder!</p></body></html>');
    const [jsonOffer, setJsonOffer] = useState('JSON Place Holder!!');
    const [targetOffer, setTargetOffer] = useState(null);

    const decisionScopeText = new DecisionScope("eyJ4ZG06YWN0aXZpdHlJZCI6Inhjb3JlOm9mZmVyLWFjdGl2aXR5OjE0MWM4NTg2MmRiMDQ4YzkiLCJ4ZG06cGxhY2VtZW50SWQiOiJ4Y29yZTpvZmZlci1wbGFjZW1lbnQ6MTQxYzZkNWQzOGYwNDg5NyJ9");
    const decisionScopeImage = new DecisionScope("eyJ4ZG06YWN0aXZpdHlJZCI6Inhjb3JlOm9mZmVyLWFjdGl2aXR5OjE0MWM4NTg2MmRiMDQ4YzkiLCJ4ZG06cGxhY2VtZW50SWQiOiJ4Y29yZTpvZmZlci1wbGFjZW1lbnQ6MTQxYzZkYTliNDMwNDg5OCJ9");
    const decisionScopeHtml = new DecisionScope("eyJ4ZG06YWN0aXZpdHlJZCI6Inhjb3JlOm9mZmVyLWFjdGl2aXR5OjE0MWM4NTg2MmRiMDQ4YzkiLCJ4ZG06cGxhY2VtZW50SWQiOiJ4Y29yZTpvZmZlci1wbGFjZW1lbnQ6MTQxYzZkOTJjNmJhZDA4NCJ9");
    const decisionScopeJson = new DecisionScope("eyJ4ZG06YWN0aXZpdHlJZCI6Inhjb3JlOm9mZmVyLWFjdGl2aXR5OjE0MWM4NTg2MmRiMDQ4YzkiLCJ4ZG06cGxhY2VtZW50SWQiOiJ4Y29yZTpvZmZlci1wbGFjZW1lbnQ6MTQxYzZkN2VjOTZmOTg2ZCJ9");
    const decisionScopeTargetMbox = new DecisionScope("demoLoc3");

    const decisionScopes = [ decisionScopeText, decisionScopeImage, decisionScopeHtml, decisionScopeJson, decisionScopeTargetMbox ];
    const optimizeExtensionVersion = () => AEPOptimize.extensionVersion().then(newVersion => {
        console.log("AdobeExperienceSDK: AEPOptimize version: " + newVersion);
        setVersion(newVersion);
    });
    const updatePropositions = () => AEPOptimize.updatePropositions(decisionScopes, null, null);
    const getPropositions = () => AEPOptimize.getPropositions(decisionScopes).then(
        propositions => {
            console.log(`Get Proposition returned::: ${JSON.stringify(propositions)}`)
            setTextOffer(propositions[decisionScopeText.getName()].offers[0]);
            setImageOffer(propositions[decisionScopeImage.getName()].offers[0]);
            setHtmlOffer(propositions[decisionScopeHtml.getName()].offers[0]);
            setJsonOffer(propositions[decisionScopeJson.getName()].offers[0]);                        
            setTargetOffer(propositions[decisionScopeTargetMbox.getName()].offers[0]);
        });
    const clearCachedProposition = () => AEPOptimize.clearCachedPropositions();
    const onPropositionUpdate = () => AEPOptimize.onPropositionUpdate(propositions => {
        setTextOffer(propositions[decisionScopeText.getName()].offers[0]);
        setImageOffer(propositions[decisionScopeImage.getName()].offers[0]);
        setHtmlOffer(propositions[decisionScopeHtml.getName()].offers[0]);
        setJsonOffer(propositions[decisionScopeJson.getName()].offers[0]);
        setTargetOffer(propositions[decisionScopeTargetMbox.getName()].offers[0]);
    });    

    const renderTargetOffer = () => {
        // console.log(`TARGET::::::${JSON.stringify(targetOffer)}`);
        if(targetOffer) {
            // JSON.stringify(`TARGET::::::${targetOffer}`);
            if(targetOffer.type === TARGET_OFFER_TYPE_TEXT) { 
                console.log("::TARGET_OFFER_TYPE_TEXT::");
                return <Text style={{margin:10, fontSize:18}}>{targetOffer.content}</Text>
            } else if(targetOffer.type === TARGET_OFFER_TYPE_JSON) {
                console.log("::TARGET_OFFER_TYPE_JSON::");
                return <Text style={{margin:10, fontSize:18}}>{targetOffer.content}</Text>
            } else if(targetOffer.type === TARGET_OFFER_TYPE_HTML) {
                console.log("::TARGET_OFFER_TYPE_HTML:: "+ targetOffer.content);                
                return (<TouchableOpacity onPress={e => {
                        console.log('Button is pressed');
                        targetOffer.tapped();}}>                        
                        <View style={{flexDirection: "row", alignItems:'center', justifyContent:'center'}}>                                
                            <Text style={{ margin:10, fontSize:18 }}>Target offer::</Text>
                            <WebView source={{ html: targetOffer.content }}></WebView>
                        </View>
                        </TouchableOpacity>);
            }
        } 
        return <Text>Default Target Offer</Text>                
    };

    return (<View style={styles.container}>
        <ScrollView contentContainerStyle={{ marginTop: 75 }} >
        <Button onPress={() => navigation.goBack()} title="Go to main page" />
        <Text style={styles.welcome}>Optimize</Text>
        <View style={{margin:5}}>
            <Button title="Extension Version" onPress={optimizeExtensionVersion}/>
        </View>
        <View style={{margin:5}}>
            <Button title="Update Propositions" onPress={updatePropositions}/>
        </View>
        <View style={{margin:5}}>
            <Button title="Get Propositions" onPress={getPropositions}/>
        </View>
        <View style={{margin:5}}>
            <Button title="On Proposition Update" onPress={onPropositionUpdate}/>
        </View>
        <View style={{margin:5}}>
            <Button title="Clear Cached Proposition" onPress={clearCachedProposition}/>
        </View>
        <Text 
            style={{...styles.welcome, fontSize:20}}>
            SDK Version:: { version }
        </Text>
        <Text 
            style={{ margin:10, fontSize:18 }}
            onPress={e => {
                console.log('Button is pressed');
                textOffer.tapped();
            }}
            >
            Text Offer:: { typeof textOffer === "object" ? textOffer.content : textOffer }
        </Text>
        <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Text style={{ fontSize:20, margin:10, fontSize:18 }}>Image offer</Text>
            <TouchableOpacity onPress={e => {
                    console.log('Button is pressed');
                    imageOffer.tapped();
                }}>
            <Image 
                style={{width:100, height:100, margin:10}} 
                source={{ uri: typeof imageOffer === "object" ? imageOffer.content : imageOffer }}>                
            </Image>
            </TouchableOpacity >
        </View>
        <Text 
            style={{ margin:10, fontSize:18 }} 
            onPress={e => {
                console.log('Button is pressed');
                jsonOffer.tapped();
            }}>
            JSON Offer:: { typeof jsonOffer === "object" ? jsonOffer.content : jsonOffer }            
        </Text>
        <TouchableOpacity onPress={e => {
                    console.log('Button is pressed');
                    htmlOffer.tapped();}}>
        <View style={{flexDirection: "row", alignItems:'center', justifyContent:'center'}} onPress={e => {
                    console.log('Button is pressed');
                    imageOffer.tapped();
                }}>
        <Text style={{ margin:10, fontSize:18 }}>HTML offer::</Text>
        
            <WebView 
                source={{ html: typeof htmlOffer === "object" ? htmlOffer.content : htmlOffer }}>
            </WebView>
        
        </View>
        </TouchableOpacity>
        { renderTargetOffer() }
        </ScrollView>
    </View>
)};