# Interface: Filter

## Description

Model definition for the aggregated filter currently being applied to the entire data grid.

## Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `or` | [`FilterCondition`](FilterCondition.md)[] | Collection of [FilterCondition](FilterCondition.md)s that will be or-ed together. |
| `and` | `undefined` \| [`Filter`](Filter.md) | Optional [Filter](Filter.md) to and with the current one. |
