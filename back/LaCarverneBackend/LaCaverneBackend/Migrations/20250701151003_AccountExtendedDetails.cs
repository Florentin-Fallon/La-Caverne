using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LaCaverneBackend.Migrations
{
    /// <inheritdoc />
    public partial class AccountExtendedDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Accounts",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "CityName",
                table: "Accounts",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Accounts",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Accounts",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Accounts",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<int>(
                name: "PostalCode",
                table: "Accounts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "CityName",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "PostalCode",
                table: "Accounts");
        }
    }
}
