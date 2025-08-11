# build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY ["ShoppingApi/ShoppingApi.csproj", "ShoppingApi/"]
RUN dotnet restore "ShoppingApi/ShoppingApi.csproj"

COPY . .
WORKDIR "/app/ShoppingApi"
RUN dotnet publish "ShoppingApi.csproj" -c Release -o /app/publish

# runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 5166
ENTRYPOINT ["dotnet", "ShoppingApi.dll"]
# This Dockerfile builds a .NET application and runs it in a container.
