#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CartApiConstruct } from './constructs/CartApiConstruct';
import './config/config';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'CartApiStack');

new CartApiConstruct(stack, 'CartApiConstruct');
