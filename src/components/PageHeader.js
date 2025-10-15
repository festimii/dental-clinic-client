import { Box, Breadcrumbs, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

export default function PageHeader({
  title,
  subtitle,
  action,
  breadcrumbs = [],
  sx,
}) {
  const location = useLocation();

  const normalizedBreadcrumbs = breadcrumbs.length
    ? breadcrumbs
    : buildDefaultBreadcrumbs(location.pathname, title);

  return (
    <Box sx={{ mb: 3, ...sx }}>
      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
      >
        <Box>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 0.5 }}>
            {normalizedBreadcrumbs.map((crumb, index) =>
              crumb.to ? (
                <Button
                  key={crumb.label}
                  component={RouterLink}
                  to={crumb.to}
                  size="small"
                  color="inherit"
                  sx={{ textTransform: "none" }}
                >
                  {crumb.label}
                </Button>
              ) : (
                <Typography
                  key={crumb.label}
                  variant="body2"
                  color="text.secondary"
                >
                  {crumb.label}
                </Typography>
              )
            )}
          </Breadcrumbs>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            {title}
          </Typography>
          {subtitle ? (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          ) : null}
        </Box>
        {action || null}
      </Stack>
    </Box>
  );
}

function buildDefaultBreadcrumbs(pathname, title) {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = [{ label: "Home", to: "/" }];

  segments.forEach((segment, index) => {
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    const to = `/${segments.slice(0, index + 1).join("/")}`;
    const isLast = index === segments.length - 1;
    breadcrumbs.push({ label, to: isLast ? undefined : to });
  });

  const lastCrumb = breadcrumbs[breadcrumbs.length - 1];
  if (!lastCrumb || lastCrumb.label !== title) {
    breadcrumbs.push({ label: title });
  } else {
    breadcrumbs[breadcrumbs.length - 1] = { ...lastCrumb, label: title, to: undefined };
  }

  return breadcrumbs;
}
