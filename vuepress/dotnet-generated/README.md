<p align="center">
  <img src="/favicon.svg" width="100" style="margin: 15px 0;" />
</p>

<h1 align="center">Data Grid Vue dotnet</h1>

<p align="center">
  <a href="https://github.com/sponsors/nruffing">
    <img alt="GitHub Sponsors" src="https://img.shields.io/github/sponsors/nruffing?logo=github&color=%23ffa600">
  </a>
</p>

dotnet models and IQueryable extensions for handling server-side paging, sorting, filtering, and saving grid state for data-grid-vue


DataGridVueDotnet currently targets .NET 6 and probably will until [support ends in November 2024](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core).

<p align="center">
   <a href="/dotnet-generated/DataGridVueDotnet.html" target="_blank">Documentation</a>
</p>

<p align="center">
  <a href="https://github.com/nruffing/data-grid-vue-dotnet/actions/workflows/ci_cd.yml">
    <img src="https://github.com/nruffing/data-grid-vue-dotnet/actions/workflows/ci_cd.yml/badge.svg" />
  </a>
  <a href="https://github.com/nruffing/data-grid-vue-dotnet/blob/main/LICENSE" aria-label="MIT License">
    <img alt="GitHub" src="https://img.shields.io/github/license/nruffing/data-grid-vue-dotnet" />
  </a>
  <a href="https://www.nuget.org/packages/DataGridVueDotnet" target="_blank">
    <img alt="Nuget" src="https://img.shields.io/nuget/v/DataGridVueDotnet" />
  </a>
</p>

## Installation
```sh
dotnet add package DataGridVueDotnet
```

## Example
```c#
[HttpPost]
public async Task<ActionResult<PageData<TestDataItem>>> Post(PageDataRequest request)
{
    if (request is null || !request.IsValid)
    {
        return BadRequest();
    }

    var query = _context.TestDataItems.AsQueryable();
    var dataItems = await query
        .ApplyPageDataRequest(request)
        .ToArrayAsync();
    var count = await query
		.Filter(request)
		.CountAsync();

    return Ok(new PageData<TestDataItem>()
    {
        DataItems = dataItems,
        TotalItems = count
    });
}
```
A full example with an ASP.NET API and EF Core context can be seen in the [_DataGridVueDotnetExample_](https://github.com/nruffing/data-grid-vue-dotnet/tree/main/DataGridVueDotnetExample) folder.

## Release Notes

### v1.2.0
 - Add grid identifier to storage request models

### v1.1.0
 - Include symbols

### v1.0.0
 - Add models for server-side storage
 - Add documentation comments
 - Update readme

### v0.0.1-alpha
 - initial release
