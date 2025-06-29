using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LaCaverneBackend.Migrations
{
    /// <inheritdoc />
    public partial class ImageCountOnArticles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ImageCount",
                table: "Articles",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageCount",
                table: "Articles");
        }
    }
}
